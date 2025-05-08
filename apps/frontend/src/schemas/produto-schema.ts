import { PRODUTO_CATEGORIAS } from "@/data";
import { z } from "zod";

export const produtoSchema = z.object({
  id: z.number(),
  nome: z.string().min(3),
  categoria: z.enum(PRODUTO_CATEGORIAS as [string, ...string[]]),
  preco: z.number(),
  descricao: z.string().nullable(),
  imagem_url: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const postProdutoSchema = produtoSchema.pick({
  nome: true,
  categoria: true,
  preco: true,
  descricao: true,
  imagem_url: true,
});

export const putProdutoSchema = produtoSchema.pick({
  nome: true,
  categoria: true,
  preco: true,
  descricao: true,
  imagem_url: true,
});

export type PostProdutoSchema = z.infer<typeof postProdutoSchema>;
export type PutProdutoSchema = z.infer<typeof putProdutoSchema>;
