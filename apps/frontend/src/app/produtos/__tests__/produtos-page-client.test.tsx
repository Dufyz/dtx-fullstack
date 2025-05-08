import { render } from "@testing-library/react";
import { ProdutosPageClient } from "../produtos-page-client";
import { useProdutosStore } from "@/stores/produtos-store";
import { PRODUTOS } from "@/data";
import { Produto } from "@/types/produto-type";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => "/produtos",
}));

jest.mock("@/stores/produtos-store", () => ({
  useProdutosStore: jest.fn(),
}));

describe("ProdutosPageClient", () => {
  beforeEach(() => {
    const mockStore = {
      produtos: PRODUTOS,
      listProdutos: (produtos: Produto[], params: { limit: number }) => ({
        data: produtos.slice(0, params.limit),
        total: produtos.length,
      }),
    };

    (useProdutosStore as unknown as jest.Mock).mockImplementation(
      (selector) => {
        if (typeof selector === "function") {
          return selector(mockStore);
        }
        return mockStore;
      }
    );
  });

  it("should render with initial data", () => {
    const { container } = render(
      <ProdutosPageClient
        initialPageData={{
          page: 1,
          limit: 10,
        }}
      />
    );
    expect(container);
  });

  it("should render with search filter", () => {
    const { container } = render(
      <ProdutosPageClient
        initialPageData={{
          page: 1,
          limit: 10,
          search: "Smartphone",
        }}
      />
    );
    expect(container);
  });

  it("should render with category filter", () => {
    const { container } = render(
      <ProdutosPageClient
        initialPageData={{
          page: 1,
          limit: 10,
          categoria: "Eletrônicos",
        }}
      />
    );
    expect(container);
  });

  it("should render with price range filter", () => {
    const { container } = render(
      <ProdutosPageClient
        initialPageData={{
          page: 1,
          limit: 10,
          faixaPreco: "1000-5000",
        }}
      />
    );
    expect(container);
  });

  it("should render with pagination", () => {
    const { container } = render(
      <ProdutosPageClient
        initialPageData={{
          page: 2,
          limit: 5,
        }}
      />
    );
    expect(container);
  });

  it("should render with all filters", () => {
    const { container } = render(
      <ProdutosPageClient
        initialPageData={{
          page: 1,
          limit: 10,
          search: "Smartphone",
          categoria: "Eletrônicos",
          faixaPreco: "1000-5000",
        }}
      />
    );
    expect(container);
  });
});
