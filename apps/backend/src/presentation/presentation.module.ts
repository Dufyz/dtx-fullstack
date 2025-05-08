import { forwardRef, Module } from '@nestjs/common';
import {
  AppController,
  PedidosController,
  ProdutoController,
} from './controller';
import { DomainModule } from 'src/domain/domain.module';
import { InfraestructureModule } from 'src/infra/infra.module';

const controllers = [AppController, PedidosController, ProdutoController];

@Module({
  imports: [
    forwardRef(() => InfraestructureModule.forPresentation()),
    DomainModule,
  ],
  controllers,
})
export class PresentationModule {}
