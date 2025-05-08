import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/infra/database/repositories/repositories.module';
import { PedidoService } from './services';

@Module({
  imports: [RepositoriesModule],
  providers: [PedidoService],
  exports: [PedidoService],
})
export class PedidoModule {}
