import { Injectable, Inject } from '@nestjs/common';
import { PedidoRepositoryInterface } from './repository';
import { Either, failure, success } from 'src/shared/utils/either';
import { BadRequestError, RepositoryErrors } from 'src/shared/errors';
import { Pedido } from './entity';
import { ProdutoRepositoryInterface } from '../produto';
import {
  PedidoProduto,
  PedidoProdutoRepositoryInterface,
} from '../pedido_produto';

@Injectable()
export class PedidoService {
  constructor(
    @Inject(PedidoRepositoryInterface)
    private readonly pedidoRepository: PedidoRepositoryInterface,
    @Inject(ProdutoRepositoryInterface)
    private readonly produtoRepository: ProdutoRepositoryInterface,
    @Inject(PedidoProdutoRepositoryInterface)
    private readonly pedidoProduto: PedidoProdutoRepositoryInterface,
  ) {}

  async list(query: { page: number; limit: number }): Promise<
    Either<
      RepositoryErrors,
      {
        data: Pedido[];
        page: number;
        limit: number;
        total: number;
      }
    >
  > {
    const pedidosOrError = await this.pedidoRepository.list(query);

    if (pedidosOrError.isFailure()) return failure(pedidosOrError.value);

    const pedidos = pedidosOrError.value;
    return success(pedidos);
  }

  async create(body: {
    produtos: {
      id: number;
      quantidade: number;
    }[];
  }): Promise<Either<RepositoryErrors, Pedido>> {
    for (const item of body.produtos) {
      if (item.quantidade <= 0) {
        return failure(
          new BadRequestError(
            `Quantidade deve ser maior que zero para o produto ${item.id}`,
          ),
        );
      }
    }

    const produtosConsolidados = new Map<number, number>();
    for (const item of body.produtos) {
      const quantidadeAtual = produtosConsolidados.get(item.id) || 0;
      produtosConsolidados.set(item.id, quantidadeAtual + item.quantidade);
    }

    const produtosUnicos = Array.from(produtosConsolidados).map(
      ([id, quantidade]) => ({
        id,
        quantidade,
      }),
    );

    const produtosIds = [...produtosConsolidados.keys()];
    const produtosOrErro = await this.produtoRepository.findByIds(produtosIds);

    if (produtosOrErro.isFailure()) return failure(produtosOrErro.value);

    const produtos = produtosOrErro.value;

    for (const produtoId of produtosIds) {
      const produtoExiste = produtos.some((p) => p.id == produtoId);
      if (!produtoExiste) {
        return failure(
          new BadRequestError(`Produto com ID ${produtoId} não encontrado`),
        );
      }
    }

    for (const [id, quantidade] of produtosConsolidados) {
      const produto = produtos.find((p) => p.id == id);
      if (!produto) continue;

      if (produto.quantidade_estoque < quantidade) {
        return failure(
          new BadRequestError(
            `Estoque insuficiente para o produto ${produto.nome}. Disponível: ${produto.quantidade_estoque}, Solicitado: ${quantidade}`,
          ),
        );
      }
    }

    const total_pedido = produtosUnicos.reduce((total, item) => {
      const produto = produtos.find((p) => p.id == item.id);
      if (!produto) return total;
      return total + produto.preco * item.quantidade;
    }, 0);

    const pedidoOrError = await this.pedidoRepository.create({
      status: 'pendente',
      total_pedido,
    });

    if (pedidoOrError.isFailure()) return failure(pedidoOrError.value);
    const pedido = pedidoOrError.value;

    const pedidoProdutos: PedidoProduto[] = [];

    for (const [id, quantidade] of produtosConsolidados) {
      const produto = produtos.find((p) => p.id == id);
      if (!produto) continue;

      const pedidoProdutoOrError = await this.pedidoProduto.create({
        id_pedido: pedido.id,
        id_produto: id,
        quantidade: quantidade,
        preco_unitario: produto.preco,
      });

      if (pedidoProdutoOrError.isFailure()) {
        return failure(pedidoProdutoOrError.value);
      }

      const pedidoProduto = pedidoProdutoOrError.value;
      pedidoProdutos.push(pedidoProduto);

      const atualizacaoEstoqueOrError = await this.produtoRepository.update(
        id,
        {
          quantidade_estoque: produto.quantidade_estoque - quantidade,
        },
      );

      if (atualizacaoEstoqueOrError.isFailure()) {
        return failure(atualizacaoEstoqueOrError.value);
      }
    }

    return success({
      ...pedido,
      itens: pedidoProdutos.map((item) => ({
        pedido_produto: item,
        produto: produtos.find((p) => p.id === item.id_produto)!,
      })),
    });
  }
}
