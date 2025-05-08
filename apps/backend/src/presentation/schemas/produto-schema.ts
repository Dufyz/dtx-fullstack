import { z } from 'zod';

const produtoSchema = z.object({
  id: z.coerce.number(),
  nome: z.coerce.string(),
  categoria: z.string(),
  descricao: z.string(),
  preco: z.coerce.number(),
  quantidade_estoque: z.coerce.number(),
  created_at: z.date(),
  updated_at: z.date(),
});

const getProdutosSchema = z.object({
  query: z
    .object({
      page: z.coerce.number().optional().default(1),
      limit: z.coerce.number().optional().default(10),
    })
    .optional()
    .default({
      page: 1,
      limit: 10,
    }),
});

const postProdutoSchema = z.object({
  body: produtoSchema.pick({
    nome: true,
    categoria: true,
    descricao: true,
    preco: true,
    quantidade_estoque: true,
  }),
});

const patchProdutoSchema = z.object({
  param: z.object({
    id: z.coerce.number(),
  }),
  body: produtoSchema
    .pick({
      nome: true,
      categoria: true,
      descricao: true,
      preco: true,
      quantidade_estoque: true,
    })
    .partial(),
});

const deleteProdutoSchema = z.object({
  param: z.object({
    id: z.coerce.number(),
  }),
});

type GetProdutosSchema = z.infer<typeof getProdutosSchema>;
type PostProdutoSchema = z.infer<typeof postProdutoSchema>;
type PatchProdutoSchema = z.infer<typeof patchProdutoSchema>;
type DeleteProdutoSchema = z.infer<typeof deleteProdutoSchema>;

export {
  produtoSchema,
  getProdutosSchema,
  postProdutoSchema,
  patchProdutoSchema,
  deleteProdutoSchema,
  GetProdutosSchema,
  PostProdutoSchema,
  PatchProdutoSchema,
  DeleteProdutoSchema,
};
