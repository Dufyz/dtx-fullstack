import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProdutosPageClient } from "./produtos-page-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProdutosPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: number;
    limit?: number;
    search?: string;
    categoria?: string;
    faixaPreco?: string;
  }>;
}) {
  const params = await searchParams;
  const page = params.page;
  const limit = params.limit;
  const search = params.search;
  const categoria = params.categoria;
  const faixaPreco = params.faixaPreco;

  return (
    <div className="flex-1">
      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de produtos</CardTitle>
          <CardDescription>
            Visualize e gerencie todos os produtos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProdutosPageClient
            initialPageData={{ page, limit, search, categoria, faixaPreco }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
