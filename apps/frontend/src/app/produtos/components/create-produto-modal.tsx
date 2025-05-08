"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { PostProdutoSchema, postProdutoSchema } from "@/schemas/produto-schema";
import { cn } from "@/lib/utils";
import { MoneyInput } from "@/components/money-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProduto } from "@/actions/produtos-actions";
import { PRODUTO_CATEGORIAS } from "@/data";

export function CreateProdutoModal() {
  const { createProduto } = useCreateProduto();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PostProdutoSchema>({
    resolver: zodResolver(postProdutoSchema),
    defaultValues: {
      nome: "",
      categoria: "",
      preco: 0,
      descricao: "",
      imagem_url: "",
    },
  });

  function onClose() {
    form.reset();
    setOpen(false);
  }

  async function onSubmit(data: PostProdutoSchema) {
    try {
      setIsSubmitting(true);

      createProduto(data);

      form.reset();
      onClose();

      toast.success("Produto criado com sucesso!", {
        description: `O produto "${data.nome}" foi adicionado ao catálogo.`,
      });
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      toast.error("Erro ao criar produto", {
        description: "Ocorreu um erro ao criar o produto. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <Plus className="mr-2 h-4 w-4" />
          <p>Novo produto</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar novo produto</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nome" className="font-medium">
                Nome <span className="text-red-500">*</span>
              </Label>
              <Input
                id="nome"
                placeholder="Digite o nome do produto"
                {...form.register("nome", {
                  required: "Nome é obrigatório",
                })}
                className={form.formState.errors.nome ? "border-red-500" : ""}
              />
              {form.formState.errors.nome && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.nome.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="categoria" className="font-medium">
                Categoria <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="categoria"
                control={form.control}
                rules={{ required: "Categoria é obrigatória" }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      className={cn("w-full", {
                        "border-red-500": form.formState.errors.categoria,
                      })}
                    >
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRODUTO_CATEGORIAS.map((categoria) => (
                        <SelectItem key={categoria} value={categoria}>
                          {categoria}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {form.formState.errors.categoria && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.categoria.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="preco" className="font-medium">
                Preço <span className="text-red-500">*</span>
              </Label>
              <MoneyInput
                id="preco"
                value={form.watch("preco") || 0}
                onValueChange={(value) =>
                  form.setValue("preco", value, {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true,
                  })
                }
              />
              {form.formState.errors.preco && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.preco.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="imagem_url" className="font-medium">
                URL da Imagem
              </Label>
              <Input
                id="imagem_url"
                placeholder="https://exemplo.com/imagem.jpg"
                {...form.register("imagem_url")}
              />
              {form.formState.errors.imagem_url && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.imagem_url.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="descricao" className="font-medium">
                Descrição
              </Label>
              <Textarea
                id="descricao"
                placeholder="Descreva o produto"
                rows={4}
                {...form.register("descricao")}
              />
              {form.formState.errors.descricao && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.descricao.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
