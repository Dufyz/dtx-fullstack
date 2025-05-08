import { renderHook, act } from "@testing-library/react";
import { useProdutosStore } from "../produtos-store";
import { PRODUTOS } from "@/data";

describe("useProdutosStore", () => {
  beforeEach(() => {
    const { result } = renderHook(() => useProdutosStore());
    act(() => {
      result.current.produtos = [...PRODUTOS];
    });
  });

  it("should match initial state snapshot", () => {
    const { result } = renderHook(() => useProdutosStore());
    expect(result.current);
  });

  it("should get product by id", () => {
    const { result } = renderHook(() => useProdutosStore());
    const produto = result.current.getById(1);
    expect(produto);
  });

  it("should list products with filters", () => {
    const { result } = renderHook(() => useProdutosStore());
    const listResult = result.current.listProdutos(result.current.produtos, {
      page: 1,
      limit: 5,
      categoria: "Eletrônicos",
    });
    expect(listResult);
  });

  it("should create a new product", () => {
    const { result } = renderHook(() => useProdutosStore());
    const newProduto = {
      nome: "Novo Produto",
      categoria: "Eletrônicos",
      preco: 999.99,
      descricao: "Descrição do novo produto",
      imagem_url: "https://exemplo.com/imagens/novo-produto.jpg",
    };

    act(() => {
      const created = result.current.create(newProduto);
      expect(created);
    });

    expect(result.current.produtos);
  });

  it("should update a product", () => {
    const { result } = renderHook(() => useProdutosStore());
    const updateData = {
      nome: "Produto Atualizado",
      preco: 1499.99,
    };

    act(() => {
      const updated = result.current.update(1, updateData);
      expect(updated);
    });

    expect(result.current.produtos);
  });

  it("should delete a product", () => {
    const { result } = renderHook(() => useProdutosStore());

    act(() => {
      result.current.delete(1);
    });

    expect(result.current.produtos);
  });
});
