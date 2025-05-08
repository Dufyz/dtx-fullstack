import { Either } from 'src/shared/utils/either';
import { RepositoryErrors } from 'src/shared/errors';
import { PedidoProduto } from './entity';

export interface PedidoProdutoRepositoryInterface {
  create(
    body: Pick<
      PedidoProduto,
      'id_pedido' | 'id_produto' | 'preco_unitario' | 'quantidade'
    >,
  ): Promise<Either<RepositoryErrors, PedidoProduto>>;
}

export const PedidoProdutoRepositoryInterface = Symbol(
  'PedidoProdutoRepository',
);
