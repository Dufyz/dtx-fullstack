import { Module } from '@nestjs/common';
import { PresentationModule } from './presentation/presentation.module';
import { InfraestructureModule } from './infra/infra.module';

@Module({
  imports: [PresentationModule, InfraestructureModule.forRoot()],
})
export class AppModule {}
