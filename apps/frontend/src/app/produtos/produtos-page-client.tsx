"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ProdutosTable } from "./components/produtos-table";
import { useProdutosStore } from "@/stores/produtos-store";

type ProdutosPageClientProps = {
  initialPageData: {
    page?: number;
    limit?: number;
    search?: string;
    categoria?: string;
    faixaPreco?: string;
  };
};

export function ProdutosPageClient({
  initialPageData,
}: ProdutosPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const listProdutos = useProdutosStore((state) => state.listProdutos);
  const produtosFromStore = useProdutosStore((state) => state.produtos);

  const [queryParams, setQueryParams] = useState({
    page: initialPageData.page || 1,
    limit: initialPageData.limit || 10,
    search: initialPageData.search,
    categoria: initialPageData.categoria,
    faixaPreco: initialPageData.faixaPreco,
  });

  const { data: produtos, total } = listProdutos(
    produtosFromStore,
    queryParams
  );

  const updateUrl = useCallback(() => {
    const newParams = new URLSearchParams();

    if (queryParams.page !== 1) {
      newParams.set("page", queryParams.page.toString());
    }

    if (queryParams.limit !== 10) {
      newParams.set("limit", queryParams.limit.toString());
    }

    if (queryParams.search) {
      newParams.set("search", queryParams.search);
    }

    if (queryParams.categoria) {
      newParams.set("categoria", queryParams.categoria);
    }

    if (queryParams.faixaPreco) {
      newParams.set("faixaPreco", queryParams.faixaPreco);
    }

    const newUrl = newParams.toString()
      ? `${pathname}?${newParams.toString()}`
      : pathname;

    router.push(newUrl, { scroll: false });
  }, [pathname, router, queryParams]);

  const handlePaginationChange = useCallback(
    (newPage: number, newLimit: number) => {
      setQueryParams((prev) => ({
        ...prev,
        page: newPage,
        limit: newLimit,
      }));
    },
    []
  );

  const handleFilterChange = useCallback(
    (search: string, categoria: string, faixaPreco: string) => {
      setQueryParams((prev) => {
        const resetPage =
          search !== prev.search ||
          categoria !== prev.categoria ||
          faixaPreco !== prev.faixaPreco;

        return {
          ...prev,
          search,
          categoria,
          faixaPreco,
          page: resetPage ? 1 : prev.page,
        };
      });
    },
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateUrl();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [updateUrl]);

  return (
    <ProdutosTable
      produtos={produtos}
      total={total}
      page={queryParams.page}
      limit={queryParams.limit}
      onPaginationChange={handlePaginationChange}
      onFilterChange={handleFilterChange}
    />
  );
}
