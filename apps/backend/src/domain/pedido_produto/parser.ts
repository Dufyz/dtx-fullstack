import { PedidoProduto } from './entity';

export function parsePedidoProdutoFromDB(
  produto: PedidoProduto,
): PedidoProduto {
  return {
    id: produto.id,
    id_pedido: produto.id_pedido,
    id_produto: produto.id_produto,
    quantidade: produto.quantidade,
    preco_unitario: produto.preco_unitario,
    created_at: produto.created_at,
    updated_at: produto.updated_at,
  };
}
