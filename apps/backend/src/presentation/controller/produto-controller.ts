import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  HttpStatus,
  HttpException,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  deleteProdutoSchema,
  DeleteProdutoSchema,
  GetProdutosSchema,
  getProdutosSchema,
  patchProdutoSchema,
  PatchProdutoSchema,
  postProdutoSchema,
  PostProdutoSchema,
} from '../schemas/produto-schema';
import { ProdutoService } from 'src/domain/produto';
import { ZodValidationPipe } from 'src/shared/pipe';

@Controller('api/produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  async getProdutos(
    @Query(new ZodValidationPipe(getProdutosSchema.shape.query))
    query: GetProdutosSchema['query'],
  ) {
    const result = await this.produtoService.list(query);

    if (result.isFailure()) {
      throw new HttpException(
        {
          message: result.value.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return result.value;
  }

  @Post()
  async postProduto(
    @Body(new ZodValidationPipe(postProdutoSchema.shape.body))
    body: PostProdutoSchema['body'],
  ) {
    const result = await this.produtoService.create(body);

    if (result.isFailure()) {
      throw new HttpException(
        {
          message: result.value.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return result.value;
  }

  @Patch(':id')
  async patchProduto(
    @Param(new ZodValidationPipe(patchProdutoSchema.shape.param))
    param: PatchProdutoSchema['param'],
    @Body(new ZodValidationPipe(patchProdutoSchema.shape.body))
    body: PatchProdutoSchema['body'],
  ) {
    const result = await this.produtoService.update(param.id, body);

    if (result.isFailure()) {
      throw new HttpException(
        {
          message: result.value.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return result.value;
  }

  @Delete(':id')
  async deleteProduto(
    @Param(new ZodValidationPipe(deleteProdutoSchema.shape.param))
    param: DeleteProdutoSchema['param'],
  ) {
    const result = await this.produtoService.delete(param.id);

    if (result.isFailure()) {
      throw new HttpException(
        {
          message: result.value.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      message: 'Deleted',
    };
  }
}
