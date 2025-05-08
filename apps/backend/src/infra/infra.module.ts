import { DynamicModule, Module } from '@nestjs/common';
import { RepositoriesModule } from './database/repositories/repositories.module';
import { DomainModule } from 'src/domain/domain.module';

@Module({})
export class InfraestructureModule {
  static forRoot(): DynamicModule {
    return {
      module: InfraestructureModule,
      imports: [RepositoriesModule, DomainModule],
      exports: [DomainModule],
    };
  }

  static forPresentation(): DynamicModule {
    return {
      module: InfraestructureModule,
      imports: [RepositoriesModule, DomainModule],
      exports: [RepositoriesModule, DomainModule],
    };
  }
}
