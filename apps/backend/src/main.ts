import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from './app.module';

import {
  ValidationPipe,
  ClassSerializerInterceptor,
  Logger,
} from '@nestjs/common';
import { HttpLoggerInterceptor } from './presentation/middleware/httpLogger-middleware';
import { environment } from './infra/config';

async function bootstrap() {
  const logger = new Logger('main');

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new HttpLoggerInterceptor());

  const port = environment.server.port;
  await app.listen(port, '0.0.0.0');
  logger.log(`Application is running on: ${await app.getUrl()}`);
}

void bootstrap();
