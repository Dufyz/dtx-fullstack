import { PedidoProduto } from '../pedido_produto';
import { Produto } from '../produto';

export type Pedido = {
  id: number;
  total_pedido: number;
  status: PedidoStatus;
  created_at: Date;
  updated_at: Date;

  itens?: {
    pedido_produto: PedidoProduto;
    produto: Produto;
  }[];
};

export type PedidoStatus = 'pendente' | 'concluido' | 'cancelado';
