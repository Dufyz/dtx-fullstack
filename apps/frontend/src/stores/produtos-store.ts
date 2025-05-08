import { create } from "zustand";
import { Produto } from "@/types/produto-type";
import { PRODUTOS } from "@/data";
import { applyProdutosFilters } from "@/lib";

type ProdutosStore = {
  produtos: Produto[];
  getById: (id: number) => Produto | null;
  listProdutos: (
    produtos: Produto[],
    query?: {
      page?: number;
      limit?: number;
      search?: string;
      categoria?: string;
      faixaPreco?: string;
    }
  ) => {
    data: Produto[];
    total: number;
    page: number;
    limit: number;
  };
  create: (
    produto: Pick<
      Produto,
      "categoria" | "descricao" | "imagem_url" | "preco" | "nome"
    >
  ) => Produto;
  update: (
    id: number,
    produto: Partial<
      Pick<Produto, "categoria" | "descricao" | "imagem_url" | "preco" | "nome">
    >
  ) => Produto;
  delete: (id: number) => void;
};

export const useProdutosStore = create<ProdutosStore>((set, get) => ({
  produtos: PRODUTOS,

  getById: (id: number) => {
    const state = get();
    return state.produtos.find((p) => p.id === id) || null;
  },

  listProdutos: (produtos, params = {}) => {
    try {
      const { page = 1, limit = 10 } = params;
      const filteredProdutos = applyProdutosFilters(produtos, params);

      const total = filteredProdutos.length;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedProdutos = filteredProdutos.slice(startIndex, endIndex);

      return {
        data: paginatedProdutos,
        total,
        page,
        limit,
      };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Erro ao carregar produtos"
      );
    }
  },

  create: (produto) => {
    const state = get();
    try {
      const newProduto: Produto = {
        ...produto,
        id: Math.max(...state.produtos.map((p) => p.id)) + 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      set((state) => ({
        produtos: [...state.produtos, newProduto],
      }));

      return newProduto;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Erro ao criar produto"
      );
    }
  },

  update: (id, body) => {
    const state = get();
    const produto = state.produtos.find((p) => p.id === id);
    if (!produto) throw new Error("Produto não encontrado");

    const updatedProduto: Produto = {
      ...produto,
      ...body,
      updated_at: new Date().toISOString(),
    };

    set((state) => ({
      produtos: state.produtos.map((p) => (p.id === id ? updatedProduto : p)),
    }));

    return updatedProduto;
  },

  delete: (id: number) => {
    set((state) => ({
      produtos: state.produtos.filter((p) => p.id !== id),
    }));
  },
}));
