import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, tap, throwError } from 'rxjs';

@Injectable()
export class HttpLoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler) {
    if (context.getType() !== 'http') return next.handle();

    const req = context.switchToHttp().getRequest();
    const { statusCode } = context.switchToHttp().getResponse();
    const { originalUrl, method, body } = req;

    this.logger.log(
      `REQUEST [${method}] ${originalUrl} ${body ? `body: ${JSON.stringify(body)}` : ''}`,
    );

    return next.handle().pipe(
      tap((data) =>
        this.logger.log(`RESPONSE [${statusCode}] ${JSON.stringify(data)}`),
      ),
      catchError((error) => {
        this.logger.error(
          `RESPONSE ${'status' in error ? `[${error.status}]` : ''} ${JSON.stringify(error)}`,
        );
        return throwError(() => error);
      }),
    );
  }
}
