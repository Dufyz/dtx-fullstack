import { Produto } from './entity';
import { Either } from 'src/shared/utils/either';
import { RepositoryErrors } from 'src/shared/errors';

export interface ProdutoRepositoryInterface {
  list(data: { page: number; limit: number }): Promise<
    Either<
      RepositoryErrors,
      {
        data: Produto[];
        page: number;
        limit: number;
        total: number;
      }
    >
  >;
  findByIds(ids: number[]): Promise<Either<RepositoryErrors, Produto[]>>;
  create(
    body: Pick<
      Produto,
      'nome' | 'categoria' | 'descricao' | 'preco' | 'quantidade_estoque'
    >,
  ): Promise<Either<RepositoryErrors, Produto>>;
  update(
    id: number,
    body: Partial<
      Pick<
        Produto,
        'nome' | 'categoria' | 'descricao' | 'preco' | 'quantidade_estoque'
      >
    >,
  ): Promise<Either<RepositoryErrors, Produto>>;
  delete(id: number): Promise<Either<RepositoryErrors, void>>;
}

export const ProdutoRepositoryInterface = Symbol('ProdutoRepository');
