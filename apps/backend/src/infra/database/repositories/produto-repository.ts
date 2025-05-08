/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import sql from '../postgresql';
import { Either, failure, success } from 'src/shared/utils/either';
import {
  parseProdutoFromDB,
  Produto,
  ProdutoRepositoryInterface,
} from 'src/domain/produto';
import { filterObjNullishValues } from 'src/shared/utils/filterObjNullishValues';
import { getRepositoryError, RepositoryErrors } from 'src/shared/errors';

@Injectable()
export class ProdutoRepository implements ProdutoRepositoryInterface {
  async list(data: { page: number; limit: number }): Promise<
    Either<
      RepositoryErrors,
      {
        data: Produto[];
        page: number;
        limit: number;
        total: number;
      }
    >
  > {
    try {
      const offset = (data.page - 1) * data.limit;

      const produtos: Produto[] = await sql`
        SELECT 
            id, 
            nome,
            categoria,
            descricao,
            preco,
            quantidade_estoque,
            created_at,
            updated_at
        FROM produtos
        ORDER BY created_at DESC
        LIMIT ${data.limit} OFFSET ${offset}
      `;

      const [{ count }] = await sql`
        SELECT COUNT(*) as count FROM produtos
      `;

      return success({
        data: produtos.map(parseProdutoFromDB),
        page: data.page,
        limit: data.limit,
        total: Number(count),
      });
    } catch (e) {
      return failure(getRepositoryError(e));
    }
  }

  async findByIds(ids: number[]): Promise<Either<RepositoryErrors, Produto[]>> {
    try {
      if (!ids || ids.length === 0) {
        return success([]);
      }

      const produtos = await sql`
        SELECT 
          id, 
          nome,
          categoria,
          descricao,
          preco,
          quantidade_estoque,
          created_at,
          updated_at
        FROM produtos
        WHERE id IN ${sql(ids)}
        ORDER BY id ASC
      `;

      return success(produtos.map(parseProdutoFromDB));
    } catch (e) {
      return failure(getRepositoryError(e));
    }
  }

  async create(
    body: Pick<
      Produto,
      'nome' | 'categoria' | 'descricao' | 'preco' | 'quantidade_estoque'
    >,
  ): Promise<Either<RepositoryErrors, Produto>> {
    try {
      const produtoToCreate = {
        nome: body.nome,
        categoria: body.categoria,
        descricao: body.descricao,
        preco: body.preco,
        quantidade_estoque: body.quantidade_estoque,
      };

      const colsToInsert = Object.keys(
        produtoToCreate,
      ) as (keyof typeof produtoToCreate)[];

      const [produto] = await sql`
            INSERT INTO produtos ${sql(produtoToCreate, ...colsToInsert)}
            RETURNING id, nome, categoria, descricao, preco, quantidade_estoque, created_at, updated_at
        `;

      return success(parseProdutoFromDB(produto as Produto));
    } catch (e) {
      return failure(getRepositoryError(e));
    }
  }

  async update(
    id: number,
    body: Partial<
      Pick<
        Produto,
        'nome' | 'categoria' | 'descricao' | 'preco' | 'quantidade_estoque'
      >
    >,
  ): Promise<Either<RepositoryErrors, Produto>> {
    try {
      const produtoToUpdate = filterObjNullishValues({
        nome: body.nome,
        categoria: body.categoria,
        descricao: body.descricao,
        preco: body.preco,
        quantidade_estoque: body.quantidade_estoque,
      });

      const colsToUpdate = Object.keys(
        produtoToUpdate,
      ) as (keyof typeof produtoToUpdate)[];

      const [produto] = await sql`
            UPDATE produtos
            SET ${sql(produtoToUpdate, ...colsToUpdate)}
            WHERE id = ${id}
            RETURNING id, nome, categoria, descricao, preco, quantidade_estoque, created_at, updated_at
        `;

      return success(parseProdutoFromDB(produto as Produto));
    } catch (e) {
      return failure(getRepositoryError(e));
    }
  }

  async delete(id: number): Promise<Either<RepositoryErrors, void>> {
    try {
      await sql`
            DELETE FROM produtos
            WHERE id = ${id}
        `;

      return success(undefined);
    } catch (e) {
      return failure(getRepositoryError(e));
    }
  }
}
