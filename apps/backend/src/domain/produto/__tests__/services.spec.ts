import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoService } from '../services';
import { ProdutoRepositoryInterface } from '../repository';
import { success, failure } from '../../../shared/utils/either';
import { Produto } from '../entity';
import { DatabaseError } from '../../../shared/errors/errors';

describe('ProdutoService', () => {
  let service: ProdutoService;
  let mockRepository: jest.Mocked<ProdutoRepositoryInterface>;

  const mockProduto: Produto = {
    id: 1,
    nome: 'Teste',
    categoria: 'Teste',
    descricao: 'Teste',
    preco: 100,
    quantidade_estoque: 10,
    created_at: new Date(),
    updated_at: new Date(),
  };

  beforeEach(async () => {
    mockRepository = {
      list: jest
        .fn()
        .mockImplementation((params: { page: number; limit: number }) => {
          return success({
            data: [mockProduto],
            page: params.page,
            limit: params.limit,
            total: 1,
          });
        }),
      findByIds: jest.fn().mockImplementation((ids) => {
        return success(ids.map((id) => ({ ...mockProduto, id })));
      }),
      create: jest.fn().mockImplementation((data) => {
        return success({ ...mockProduto, ...data });
      }),
      update: jest.fn().mockImplementation((id, data) => {
        return success({ ...mockProduto, ...data, id });
      }),
      delete: jest.fn().mockImplementation((id) => {
        return success(true);
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutoService,
        {
          provide: ProdutoRepositoryInterface,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProdutoService>(ProdutoService);
  });

  describe('list', () => {
    it('should return a list of products', async () => {
      const mockResult = {
        data: [mockProduto],
        page: 1,
        limit: 10,
        total: 1,
      };
      mockRepository.list.mockResolvedValueOnce(success(mockResult));

      const result = await service.list({ page: 1, limit: 10 });

      expect(result.isSuccess()).toBe(true);
      expect(result.value).toEqual(mockResult);
      expect(mockRepository.list).toHaveBeenCalledWith({ page: 1, limit: 10 });
    });

    it('should handle repository errors', async () => {
      const mockError = new DatabaseError('Erro ao listar produtos');
      mockRepository.list.mockResolvedValueOnce(failure(mockError));

      const result = await service.list({ page: 1, limit: 10 });

      expect(result.isFailure()).toBe(true);
      expect(result.value).toEqual(mockError);
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

      mockRepository.create.mockResolvedValueOnce(
        success({ ...mockProduto, ...createData }),
      );

      const result = await service.create(createData);

      expect(result.isSuccess()).toBe(true);
      expect(result.value).toEqual({ ...mockProduto, ...createData });
      expect(mockRepository.create).toHaveBeenCalledWith(createData);
    });

    it('should handle repository errors on create', async () => {
      const createData = {
        nome: 'Novo Produto',
        categoria: 'Teste',
        descricao: 'Teste',
        preco: 100,
        quantidade_estoque: 10,
      };

      const mockError = new DatabaseError('Erro ao criar produto');
      mockRepository.create.mockResolvedValueOnce(failure(mockError));

      const result = await service.create(createData);

      expect(result.isFailure()).toBe(true);
      expect(result.value).toEqual(mockError);
    });
  });
});
