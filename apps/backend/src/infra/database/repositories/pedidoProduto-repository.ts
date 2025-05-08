/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import sql from '../postgresql';
import { Either, failure, success } from 'src/shared/utils/either';
import { getRepositoryError, RepositoryErrors } from 'src/shared/errors';
import {
  parsePedidoProdutoFromDB,
  PedidoProduto,
  PedidoProdutoRepositoryInterface,
} from 'src/domain/pedido_produto';

@Injectable()
export class PedidoProdutoRepository
  implements PedidoProdutoRepositoryInterface
{
  async create(
    body: Pick<
      PedidoProduto,
      'id_pedido' | 'id_produto' | 'preco_unitario' | 'quantidade'
    >,
  ): Promise<Either<RepositoryErrors, PedidoProduto>> {
    try {
      const pedidoProdutoToCreate = {
        id_pedido: body.id_pedido,
        id_produto: body.id_produto,
        preco_unitario: body.preco_unitario,
        quantidade: body.quantidade,
      };

      const colsToInsert = Object.keys(
        pedidoProdutoToCreate,
      ) as (keyof typeof pedidoProdutoToCreate)[];

      const [pedidoProduto] = await sql`
            INSERT INTO pedido_produtos ${sql(pedidoProdutoToCreate, ...colsToInsert)}
            RETURNING id, id_pedido, id_produto, quantidade, preco_unitario, created_at, updated_at
        `;

      return success(parsePedidoProdutoFromDB(pedidoProduto as PedidoProduto));
    } catch (e) {
      return failure(getRepositoryError(e));
    }
  }
}
