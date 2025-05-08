import { Module } from '@nestjs/common';
import { PedidoModule } from './pedido/module';
import { ProdutoModule } from './produto/module';

@Module({
  imports: [PedidoModule, ProdutoModule],
  exports: [PedidoModule, ProdutoModule],
})
export class DomainModule {}
