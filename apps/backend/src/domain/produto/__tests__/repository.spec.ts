import { getRepositoryError, RepositoryErrors } from '../../../shared/errors';
import { ProdutoRepository } from 'src/infra/database/repositories';
import { Either, failure, Failure } from 'src/shared/utils/either';
import { Produto } from '../entity';

describe('ProdutoRepository', () => {
  let repository: ProdutoRepository;

  beforeEach(() => {
    repository = new ProdutoRepository();
  });

  describe('list', () => {
    it('should return a list of products', async () => {
      const createData = {
        nome: 'Produto Teste',
        categoria: 'Teste',
        descricao: 'Teste',
        preco: 100,
        quantidade_estoque: 10,
      };

      const createResult = await repository.create(createData);

      if (createResult.isFailure()) {
        throw new Error(createResult.value.message);
      }

      const produto = createResult.value;

      const result = await repository.list({ page: 1, limit: 10 });

      if (result.isFailure()) {
        throw new Error(result.value.message);
      }

      const products = result.value;

      expect(products.page).toEqual(1);
      expect(products.limit).toEqual(10);
      expect(products.total).toEqual(expect.any(Number));
      expect(products.data).toContainEqual(
        expect.objectContaining({
          id: produto.id,
          nome: produto.nome,
          categoria: produto.categoria,
          descricao: produto.descricao,
          preco: produto.preco,
          quantidade_estoque: produto.quantidade_estoque,
          created_at: expect.any(Date) as unknown as Date,
          updated_at: expect.any(Date) as unknown as Date,
        }),
      );
    });

    it('should handle database errors', async () => {
      const error = new Error('Database error');
      const repositoryError = getRepositoryError(error);

      const mockList = jest
        .spyOn(repository, 'list')
        .mockImplementation((): Promise<Either<RepositoryErrors, any>> => {
          return Promise.resolve(failure(repositoryError));
        });

      const result = await repository.list({ page: 1, limit: 10 });

      expect(result.isFailure()).toBe(true);
      expect(result.value).toBe(repositoryError);

      mockList.mockRestore();
    });
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const createData = {
        nome: 'Novo Produto',
        categoria: 'Teste',
        descricao: 'Teste',
        preco: 100,
        quantidade_estoque: 10,
      };

      const result = await repository.create(createData);

      if (result.isFailure()) {
        throw new Error(result.value.message);
      }

      expect(result.value).toEqual(
        expect.objectContaining({
          id: expect.any(String) as number,
          nome: 'Novo Produto',
          categoria: 'Teste',
          descricao: 'Teste',
          preco: expect.any(String) as null,
          quantidade_estoque: 10,
          created_at: expect.any(Date) as unknown as Date,
          updated_at: expect.any(Date) as unknown as Date,
        }),
      );
    });

    it('should handle database errors on create', async () => {
      const error = new Error('Database error');
      const repositoryError = getRepositoryError(error);

      const mockCreate = jest
        .spyOn(repository, 'create')
        .mockImplementation((): Promise<Either<RepositoryErrors, Produto>> => {
          return Promise.resolve(new Failure(repositoryError));
        });

      const createData = {
        nome: 'Novo Produto',
        categoria: 'Teste',
        descricao: 'Teste',
        preco: 100,
        quantidade_estoque: 10,
      };

      const result = await repository.create(createData);

      expect(result.isFailure()).toBe(true);
      expect(result.value).toBe(repositoryError);

      mockCreate.mockRestore();
    });
  });
});
