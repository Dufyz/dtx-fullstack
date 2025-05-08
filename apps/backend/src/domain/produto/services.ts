import { Injectable, Inject } from '@nestjs/common';
import { ProdutoRepositoryInterface } from './repository';
import { Either, failure, success } from 'src/shared/utils/either';
import { RepositoryErrors } from 'src/shared/errors';
import { Produto } from './entity';

@Injectable()
export class ProdutoService {
  constructor(
    @Inject(ProdutoRepositoryInterface)
    private readonly produtoRepository: ProdutoRepositoryInterface,
  ) {}

  async list(query: { page: number; limit: number }): Promise<
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
    const result = await this.produtoRepository.list(query);

    if (result.isFailure()) return failure(result.value);

    return success(result.value);
  }

  async create(
    body: Pick<
      Produto,
      'nome' | 'categoria' | 'descricao' | 'preco' | 'quantidade_estoque'
    >,
  ): Promise<Either<RepositoryErrors, Produto>> {
    const result = await this.produtoRepository.create(body);

    if (result.isFailure()) return failure(result.value);

    return success(result.value);
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
    const result = await this.produtoRepository.update(id, body);

    if (result.isFailure()) return failure(result.value);

    return success(result.value);
  }

  async delete(id: number): Promise<Either<RepositoryErrors, void>> {
    const result = await this.produtoRepository.delete(id);

    if (result.isFailure()) return failure(result.value);

    return success(result.value);
  }
}
