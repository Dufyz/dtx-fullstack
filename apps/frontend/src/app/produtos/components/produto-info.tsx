"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Calendar, Tag, CircleDollarSign, Clock } from "lucide-react";
import { Produto } from "@/types/produto-type";
import { formatMoneyValue } from "@/lib";
import { IconPackage, IconCategory } from "@tabler/icons-react";
import { UpdateProdutoModal } from "./update-produto-modal";
import { DeleteProdutoModal } from "./delete-produto-modal";

export default function ProdutoInfo({ produto }: { produto: Produto }) {
  return (
    <div className="grid gap-4 lg:gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card className="overflow-hidden border shadow-sm pt-0">
          <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 h-28 md:h-32 flex items-end">
            <div className="absolute top-4 left-4">
              <Badge className="bg-white/90 text-green-700 hover:bg-white">
                ID: {produto.id}
              </Badge>
            </div>

            <div className="absolute bottom-0 translate-y-1/2 left-4">
              <Avatar className="h-20 w-20 md:h-24 md:w-24 rounded-xl border-4 border-white shadow-sm">
                <AvatarImage
                  src={
                    produto.imagem_url || "/placeholder.svg?height=96&width=96"
                  }
                  alt={produto.nome}
                  className="object-cover"
                />
                <AvatarFallback className="text-2xl bg-white text-green-600 rounded-xl">
                  {produto.nome
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          <CardContent className="space-y-5 pt-14 md:pt-16 px-4">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 truncate">
                    {produto.nome}
                  </h3>
                  <div className="flex items-center mt-2">
                    <Badge
                      variant="outline"
                      className="text-gray-600 bg-gray-50"
                    >
                      {produto.categoria}
                    </Badge>
                  </div>
                </div>

                <div className="sm:text-right flex-shrink-0">
                  <div className="text-green-600 font-bold text-xl md:text-2xl">
                    {formatMoneyValue(produto.preco)}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Preço unitário</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid gap-3 grid-cols-1 xs:grid-cols-2">
              <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-50 flex-shrink-0">
                  <CircleDollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-500">Preço</p>
                  <span className="text-base md:text-lg font-medium block truncate">
                    {formatMoneyValue(produto.preco)}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 flex-shrink-0">
                  <IconCategory className="h-5 w-5 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-500">Categoria</p>
                  <span className="text-base md:text-lg font-medium block truncate">
                    {produto.categoria}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-50 flex-shrink-0">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-500">Data de Criação</p>
                  <span className="text-sm block truncate">
                    {formatDateTime(produto.created_at)}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-50 flex-shrink-0">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-500">Última Atualização</p>
                  <span className="text-sm block truncate">
                    {formatDateTime(produto.updated_at)}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-base md:text-lg font-medium mb-3 flex items-center">
                <span className="bg-gray-100 w-6 h-6 inline-flex items-center justify-center rounded-full mr-2 text-gray-500 text-xs">
                  1
                </span>
                Descrição
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                {produto.descricao && (
                  <p className="text-gray-700 leading-relaxed">
                    {produto.descricao}
                  </p>
                )}
                {!produto.descricao && (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                      <Tag className="h-5 w-5 text-gray-400" />
                    </div>
                    <p className="text-gray-500 italic">
                      Este produto não possui uma descrição.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-base md:text-lg font-medium mb-3 flex items-center">
                <span className="bg-gray-100 w-6 h-6 inline-flex items-center justify-center rounded-full mr-2 text-gray-500 text-xs">
                  2
                </span>
                Informações Técnicas
              </h4>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-sm">
                      <IconPackage className="h-4 w-4 text-gray-500" />
                    </div>
                    <h5 className="font-medium text-gray-700">
                      Detalhes do Produto
                    </h5>
                  </div>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex justify-between items-center border-b border-dashed border-gray-200 pb-2">
                      <span className="text-gray-500">ID:</span>
                      <span className="font-medium">{produto.id}</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-dashed border-gray-200 pb-2">
                      <span className="text-gray-500">Preço:</span>
                      <span className="font-medium">
                        {formatMoneyValue(produto.preco)}
                      </span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-500">Categoria:</span>
                      <span className="font-medium">{produto.categoria}</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-sm">
                      <Tag className="h-4 w-4 text-gray-500" />
                    </div>
                    <h5 className="font-medium text-gray-700">
                      Rastreabilidade
                    </h5>
                  </div>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex justify-between items-center border-b border-dashed border-gray-200 pb-2">
                      <span className="text-gray-500">Cadastrado em:</span>
                      <span className="font-medium">
                        {new Date(produto.created_at).toLocaleDateString(
                          "pt-BR"
                        )}
                      </span>
                    </li>
                    <li className="flex justify-between items-center border-b border-dashed border-gray-200 pb-2">
                      <span className="text-gray-500">Atualizado em:</span>
                      <span className="font-medium">
                        {new Date(produto.updated_at).toLocaleDateString(
                          "pt-BR"
                        )}
                      </span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-500">Status:</span>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 hover:bg-green-100"
                      >
                        Ativo
                      </Badge>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="border shadow-sm overflow-hidden pt-0">
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-4">
            <h3 className="font-bold text-lg text-green-800">
              Ações do Produto
            </h3>
            <p className="text-sm text-green-700 mt-1">Gerencie este produto</p>
          </div>
          <CardContent className="p-4 flex flex-col gap-4">
            <UpdateProdutoModal produto={produto} />
            <DeleteProdutoModal produto={produto} />
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Dados Rápidos</CardTitle>
            <CardDescription>Informações resumidas do produto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
              <span className="text-sm text-gray-500 flex items-center">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                ID
              </span>
              <span className="font-medium">{produto.id}</span>
            </div>
            <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
              <span className="text-sm text-gray-500 flex items-center">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                Preço
              </span>
              <span className="font-medium">
                {formatMoneyValue(produto.preco)}
              </span>
            </div>
            <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
              <span className="text-sm text-gray-500 flex items-center">
                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                Categoria
              </span>
              <span className="font-medium">{produto.categoria}</span>
            </div>
            <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
              <span className="text-sm text-gray-500 flex items-center">
                <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                Data de criação
              </span>
              <span className="font-medium">
                {new Date(produto.created_at).toLocaleDateString("pt-BR")}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const formatDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  return `${date.toLocaleDateString("pt-BR")} às ${date.toLocaleTimeString(
    "pt-BR",
    { hour: "2-digit", minute: "2-digit" }
  )}`;
};
