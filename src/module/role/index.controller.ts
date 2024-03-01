import { Controller, Get } from '@nestjs/common';
import TheService from './index.service';

@Controller()
export default class TheController {
  constructor(private readonly service: TheService) {}

  @Get()
  getHello(): string {
    return this.service.getHello();
  }
}
