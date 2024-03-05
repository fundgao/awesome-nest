import { Controller, Get } from '@nestjs/common';
import TheService from './index.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('角色管理')
@Controller('role')
export default class TheController {
  constructor(private readonly service: TheService) {}

  @Get()
  getHello(): string {
    return this.service.getHello();
  }
}
