import { Pedido } from './entity';

export function parsePedidoFromDB(event: Pedido): Pedido {
  return {
    id: event.id,
    status: event.status,
    total_pedido: event.total_pedido,
    created_at: event.created_at,
    updated_at: event.updated_at,

    itens: event.itens,
  };
}
