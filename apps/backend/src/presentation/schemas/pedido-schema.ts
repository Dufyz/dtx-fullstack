import { z } from 'zod';

const pedidoSchema = z.object({
  id: z.coerce.number(),
  total_pedido: z.coerce.number(),
  status: z.enum(['pendente', 'concluido', 'cancelado']),
  created_at: z.date(),
  updated_at: z.date(),
});

const getPedidosSchema = z.object({
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

const postPedidoSchema = z.object({
  body: z.object({
    produtos: z.array(
      z.object({
        id: z.coerce.number(),
        quantidade: z.coerce.number(),
      }),
    ),
  }),
});

type GetPedidosSchema = z.infer<typeof getPedidosSchema>;
type PostPedidoSchema = z.infer<typeof postPedidoSchema>;

export {
  pedidoSchema,
  getPedidosSchema,
  postPedidoSchema,
  GetPedidosSchema,
  PostPedidoSchema,
};
