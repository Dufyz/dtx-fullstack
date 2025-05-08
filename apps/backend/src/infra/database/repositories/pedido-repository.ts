/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import sql from '../postgresql';
import { Either, failure, success } from 'src/shared/utils/either';
import { getRepositoryError, RepositoryErrors } from 'src/shared/errors';
import {
  parsePedidoFromDB,
  Pedido,
  PedidoRepositoryInterface,
} from 'src/domain/pedido';

@Injectable()
export class PedidoRepository implements PedidoRepositoryInterface {
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
    try {
      const offset = (query.page - 1) * query.limit;

      const pedidosBase = await sql`
        SELECT 
            id, 
            total_pedido,
            status,
            created_at,
            updated_at
        FROM pedidos
        ORDER BY created_at DESC
        LIMIT ${query.limit} OFFSET ${offset}
      `;

      const pedidosCompletos: Pedido[] = [];

      for (const pedidoBase of pedidosBase) {
        const itensPedido = await sql`
          SELECT 
            pp.id as pedido_produto_id,
            pp.quantidade as pedido_produto_quantidade,
            pp.preco_unitario as pedido_produto_preco_unitario,
            pp.created_at as pedido_produto_created_at,
            pp.updated_at as pedido_produto_updated_at,
            p.id as produto_id,
            p.nome as produto_nome,
            p.categoria as produto_categoria,
            p.descricao as produto_descricao,
            p.preco as produto_preco,
            p.quantidade_estoque as produto_quantidade_estoque,
            p.created_at as produto_created_at,
            p.updated_at as produto_updated_at
          FROM pedido_produtos pp
          JOIN produtos p ON pp.id_produto = p.id
          WHERE pp.id_pedido = ${pedidoBase.id}
        `;

        const itensFormatados = itensPedido.map((item) => ({
          pedido_produto: {
            id: item.pedido_produto_id,
            id_pedido: pedidoBase.id,
            id_produto: item.produto_id,
            quantidade: item.pedido_produto_quantidade,
            preco_unitario: item.pedido_produto_preco_unitario,
            created_at: item.pedido_produto_created_at,
            updated_at: item.pedido_produto_updated_at,
          },
          produto: {
            id: item.produto_id,
            nome: item.produto_nome,
            categoria: item.produto_categoria,
            descricao: item.produto_descricao,
            preco: item.produto_preco,
            quantidade_estoque: item.produto_quantidade_estoque,
            created_at: item.produto_created_at,
            updated_at: item.produto_updated_at,
          },
        }));

        pedidosCompletos.push({
          ...parsePedidoFromDB(pedidoBase as Pedido),
          itens: itensFormatados,
        });
      }

      const [{ count }] = await sql`
        SELECT COUNT(*) as count FROM pedidos
      `;

      return success({
        data: pedidosCompletos,
        page: query.page,
        limit: query.limit,
        total: Number(count),
      });
    } catch (e) {
      return failure(getRepositoryError(e));
    }
  }

  async create(
    body: Pick<Pedido, 'status' | 'total_pedido'>,
  ): Promise<Either<RepositoryErrors, Pedido>> {
    try {
      const pedidoToCreate: Pick<Pedido, 'status' | 'total_pedido'> = {
        status: body.status,
        total_pedido: body.total_pedido,
      };

      const colsToInsert = Object.keys(
        pedidoToCreate,
      ) as (keyof typeof pedidoToCreate)[];

      const [pedido] = await sql`
            INSERT INTO pedidos ${sql(pedidoToCreate, ...colsToInsert)}
            RETURNING id, total_pedido, status, created_at, updated_at
        `;

      return success(parsePedidoFromDB(pedido as Pedido));
    } catch (e) {
      return failure(getRepositoryError(e));
    }
  }
}
