import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import {
  getPedidosSchema,
  GetPedidosSchema,
  postPedidoSchema,
  PostPedidoSchema,
} from '../schemas/pedido-schema';
import { PedidoService } from 'src/domain/pedido';
import { ZodValidationPipe } from 'src/shared/pipe/zodRequestValidation-pipe';

@Controller('api/pedidos')
export class PedidosController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Get()
  async getPedidos(
    @Query(new ZodValidationPipe(getPedidosSchema.shape.query))
    query: GetPedidosSchema['query'],
  ) {
    const result = await this.pedidoService.list(query);

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
  async postPedido(
    @Body(new ZodValidationPipe(postPedidoSchema.shape.body))
    body: PostPedidoSchema['body'],
  ) {
    const result = await this.pedidoService.create(body);

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
}
