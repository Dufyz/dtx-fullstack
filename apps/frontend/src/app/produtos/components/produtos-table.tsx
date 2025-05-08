"use client";

import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { Produto } from "@/types/produto-type";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState, useEffect } from "react";
import { FAIXAS_PRECO, PRODUTO_CATEGORIAS } from "@/data";
import { formatMoneyValue } from "@/lib";
import { CreateProdutoModal } from "./create-produto-modal";

type ProdutosTableProps = {
  produtos: Produto[];
  total: number;
  page: number;
  limit: number;
  onPaginationChange: (page: number, limit: number) => void;
  onFilterChange: (
    search: string,
    categoria: string,
    faixaPreco: string
  ) => void;
};

export function ProdutosTable({
  produtos,
  total,
  page,
  limit,
  onPaginationChange,
  onFilterChange,
}: ProdutosTableProps) {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaFilter, setCategoriaFilter] = useState("all");
  const [faixaPrecoFilter, setFaixaPrecoFilter] = useState("all");

  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, total);

  function rowClick(id: number) {
    router.push(`/produtos/${id}`);
  }

  function renderPaginationItems() {
    const items = [];

    items.push(
      <PaginationItem key="first">
        <PaginationLink
          isActive={page === 1}
          onClick={() => onPaginationChange(1, limit)}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    if (page > 3) {
      items.push(
        <PaginationItem key="ellipsis1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(totalPages - 1, page + 1);
      i++
    ) {
      if (i <= 1 || i >= totalPages) continue;
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={page === i}
            onClick={() => onPaginationChange(i, limit)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (page < totalPages - 2 && totalPages > 4) {
      items.push(
        <PaginationItem key="ellipsis2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink
            isActive={page === totalPages}
            onClick={() => onPaginationChange(totalPages, limit)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      onFilterChange(searchTerm, categoriaFilter, faixaPrecoFilter);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, categoriaFilter, faixaPrecoFilter, onFilterChange]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex items-center space-x-2">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por nome ou descrição..."
              className="pl-8 min-w-[300px] w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col flex-wrap space-y-2 md:flex-row md:space-x-2 md:space-y-0">
          <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filtrar por categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {PRODUTO_CATEGORIAS.map((categoria) => (
                <SelectItem key={categoria} value={categoria}>
                  {categoria}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={faixaPrecoFilter} onValueChange={setFaixaPrecoFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filtrar por preço" />
            </SelectTrigger>
            <SelectContent>
              {FAIXAS_PRECO.map((faixa) => (
                <SelectItem key={faixa.value} value={faixa.value}>
                  {faixa.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={limit.toString()}
            onValueChange={(value) => {
              onPaginationChange(1, Number(value));
            }}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Itens por página" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 por página</SelectItem>
              <SelectItem value="10">10 por página</SelectItem>
              <SelectItem value="15">15 por página</SelectItem>
              <SelectItem value="20">20 por página</SelectItem>
            </SelectContent>
          </Select>
          <CreateProdutoModal />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Data de Atualização</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {produtos.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Nenhum produto encontrado.
                </TableCell>
              </TableRow>
            )}
            {produtos.length > 0 &&
              produtos.map((produto) => (
                <TableRow
                  key={produto.id}
                  onClick={() => rowClick(produto.id)}
                  className="cursor-pointer hover:bg-green-50"
                >
                  <TableCell className="font-medium">{produto.nome}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{produto.categoria}</Badge>
                  </TableCell>
                  <TableCell>{formatMoneyValue(produto.preco)}</TableCell>
                  <TableCell>
                    {!produto.descricao && (
                      <span className="text-muted-foreground italic">
                        Sem descrição
                      </span>
                    )}
                    {produto.descricao && produto.descricao.length > 50 && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="cursor-help">
                              {produto.descricao.substring(0, 50)}...
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>{produto.descricao}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                    {produto.descricao && produto.descricao.length <= 50 && (
                      <p>{produto.descricao}</p>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(produto.updated_at).toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      <div className="w-full flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          <p>
            {startIndex + 1}-{endIndex} de {total} produtos
          </p>
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => page > 1 && onPaginationChange(page - 1, limit)}
                className={"cursor-pointer"}
              />
            </PaginationItem>

            {renderPaginationItems()}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  page < totalPages && onPaginationChange(page + 1, limit)
                }
                className={"cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
