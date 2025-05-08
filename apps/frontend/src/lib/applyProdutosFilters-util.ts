import { Produto } from "@/types/produto-type";

export function applyProdutosFilters(
  produtos: Produto[],
  filters: {
    search?: string;
    categoria?: string;
    faixaPreco?: string;
  }
): Produto[] {
  return produtos.filter((produto) => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        produto.nome.toLowerCase().includes(searchLower) ||
        (produto.descricao &&
          produto.descricao.toLowerCase().includes(searchLower));
      if (!matchesSearch) return false;
    }

    if (
      filters.categoria &&
      produto.categoria !== filters.categoria &&
      filters.categoria !== "all"
    ) {
      return false;
    }

    if (filters.faixaPreco && filters.faixaPreco !== "all") {
      const preco = produto.preco;
      switch (filters.faixaPreco) {
        case "0-100":
          if (preco > 100) return false;
          break;
        case "100-500":
          if (preco <= 100 || preco > 500) return false;
          break;
        case "500-1000":
          if (preco <= 500 || preco > 1000) return false;
          break;
        case "1000-5000":
          if (preco <= 1000 || preco > 5000) return false;
          break;
        case "5000+":
          if (preco <= 5000) return false;
          break;
      }
    }

    return true;
  });
}
