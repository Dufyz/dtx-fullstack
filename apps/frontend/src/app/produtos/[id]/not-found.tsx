"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PackageX } from "lucide-react";

export default function ProdutoNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="flex items-center justify-center w-24 h-24 bg-red-50 rounded-full mb-6">
        <PackageX className="h-12 w-12 text-red-500" />
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Produto não encontrado
      </h1>

      <p className="text-gray-600 mb-8 max-w-md">
        O produto que você está procurando não existe ou foi removido. Verifique
        o ID do produto e tente novamente.
      </p>

      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
        <Link href="/produtos">
          <Button>Ver todos os produtos</Button>
        </Link>
      </div>
    </div>
  );
}
