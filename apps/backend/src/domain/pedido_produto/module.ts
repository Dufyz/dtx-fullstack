import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/infra/database/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  providers: [],
  exports: [],
})
export class ProdutoModule {}
