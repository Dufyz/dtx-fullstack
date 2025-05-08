import { Controller, Get } from '@nestjs/common';

@Controller('/api')
export class AppController {
  constructor() {}

  @Get('/health-check')
  getHealthCheck() {
    return { message: 'Server is up and running' };
  }
}
