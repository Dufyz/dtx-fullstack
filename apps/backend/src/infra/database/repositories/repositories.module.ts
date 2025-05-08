import { Module, Provider } from '@nestjs/common';
import { PedidoRepositoryInterface } from 'src/domain/pedido';
import { PedidoProdutoRepositoryInterface } from 'src/domain/pedido_produto';
import { ProdutoRepositoryInterface } from 'src/domain/produto';
import {
  PedidoProdutoRepository,
  PedidoRepository,
  ProdutoRepository,
} from './index';

const repositories: Provider[] = [
  { provide: ProdutoRepositoryInterface, useClass: ProdutoRepository },
  { provide: PedidoRepositoryInterface, useClass: PedidoRepository },
  {
    provide: PedidoProdutoRepositoryInterface,
    useClass: PedidoProdutoRepository,
  },
];

@Module({
  imports: [],
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoriesModule {}
