import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/infra/database/repositories/repositories.module';
import { ProdutoService } from './services';

@Module({
  imports: [RepositoriesModule],
  providers: [ProdutoService],
  exports: [ProdutoService],
})
export class ProdutoModule {}
