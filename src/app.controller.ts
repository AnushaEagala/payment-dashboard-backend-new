import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return { message: 'Welcome to Payment Dashboard API' };
  }

  @Get('get')
  getExample() {
    return { message: 'This is the /get route response' };
  }
}
