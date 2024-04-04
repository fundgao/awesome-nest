import { Controller, Get, Query } from '@nestjs/common';
import TheService from './index.service';
import { ApiTags } from '@nestjs/swagger';
import ValidatorPipe from '@/utils/ValidatorPipe';
import { RoleDto } from './index.dto';
import { getPageParams } from '@/config/BaseEntity';

@ApiTags('角色管理')
@Controller('role')
export default class TheController {
  constructor(private readonly service: TheService) {}

  @ApiTags('查询角色')
  @Get('id/:id')
  async getRole(@Query(new ValidatorPipe()) dto: RoleDto) {
    const { role_id } = dto;
    return this.service.findOne({
      role_id,
    });
  }

  @ApiTags('分页')
  @Get('page')
  async page(@Query(new ValidatorPipe()) dto: RoleDto) {
    const { params, option } = getPageParams(dto);
    return this.service.page({
      params,
      option,
    });
  }
}
