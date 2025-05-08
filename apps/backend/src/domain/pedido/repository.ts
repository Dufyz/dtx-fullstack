import { Pedido } from './entity';
import { Either } from 'src/shared/utils/either';
import { RepositoryErrors } from 'src/shared/errors';

export interface PedidoRepositoryInterface {
  list(data: { page: number; limit: number }): Promise<
    Either<
      RepositoryErrors,
      {
        data: Pedido[];
        page: number;
        limit: number;
        total: number;
      }
    >
  >;
  create(
    body: Pick<Pedido, 'status' | 'total_pedido'>,
  ): Promise<Either<RepositoryErrors, Pedido>>;
}

export const PedidoRepositoryInterface = Symbol('PedidoRepository');
