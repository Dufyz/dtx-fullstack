import { useProdutosStore } from "@/stores/produtos-store";
import { Produto } from "@/types/produto-type";

function useProdutoById() {
  const getById = useProdutosStore((state) => state.getById);

  function getProdutoById(id: number) {
    return getById(id);
  }

  return {
    getProdutoById,
  };
}

function useCreateProduto() {
  const create = useProdutosStore((state) => state.create);

  function createProduto(
    produto: Pick<
      Produto,
      "categoria" | "descricao" | "imagem_url" | "preco" | "nome"
    >
  ) {
    create(produto);
  }

  return {
    createProduto,
  };
}

function useUpdateProduto() {
  const update = useProdutosStore((state) => state.update);

  function updateProduto(
    id: number,
    produto: Partial<
      Pick<Produto, "categoria" | "descricao" | "imagem_url" | "preco" | "nome">
    >
  ) {
    update(id, produto);
  }

  return {
    updateProduto,
  };
}

function useDeleteProduto() {
  const deleteProdutoStore = useProdutosStore((state) => state.delete);

  function deleteProduto(id: number) {
    deleteProdutoStore(id);
  }

  return {
    deleteProduto,
  };
}

export { useProdutoById, useCreateProduto, useDeleteProduto, useUpdateProduto };
