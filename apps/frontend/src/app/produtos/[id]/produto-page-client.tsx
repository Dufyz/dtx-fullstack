"use client";

import { notFound, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ProdutoInfo from "../components/produto-info";
import { useProdutosStore } from "@/stores/produtos-store";

type ProdutoPageClientProps = {
  params: {
    id: number;
  };
};

export default function ProdutoPageClient({ params }: ProdutoPageClientProps) {
  const { getById } = useProdutosStore();
  const router = useRouter();
  const produto = getById(params.id);

  if (!produto) return notFound();

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/produtos")}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para produtos
          </Button>
        </div>
      </div>

      <ProdutoInfo produto={produto} />
    </div>
  );
}
