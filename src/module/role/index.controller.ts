import {
  Controller,
  Query,
  Get,
  Post,
  BadRequestException,
  Delete,
} from '@nestjs/common';
import TheService from './index.service';
import { ApiTags } from '@nestjs/swagger';
import ValidatorPipe from '@/utils/ValidatorPipe';
import { RoleDto } from './index.dto';
import { getPageParams } from '@/config/BaseEntity';
import { v4 as uuidv4 } from 'uuid';

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

  @ApiTags('分页')
  @Get('all')
  async all(@Query(new ValidatorPipe()) dto: RoleDto) {
    const { role_id, role_name } = dto;
    return this.service.findAll({
      role_id,
      role_name,
    });
  }

  @ApiTags('新增角色')
  @Post('create')
  async create(@Query(new ValidatorPipe()) dto: RoleDto) {
    const { role_name, description } = dto;
    if (!role_name) {
      throw new BadRequestException('角色名不能为空！');
    }
    try {
      const item = await this.service.findOne({ role_name });
      if (!!item) {
        throw new BadRequestException('该角色已存在！');
      } else {
        this.service.create({
          role_id: uuidv4(),
          role_name,
          description,
        });
      }
    } catch (error) {
      console.error(error);
    }
    return '创建角色成功！';
  }

  @ApiTags('更新角色')
  @Post('update')
  async update(@Query(new ValidatorPipe()) dto: RoleDto) {
    try {
      this.service.update(dto);
    } catch (error) {
      console.error(error);
    }
    return '更新角色成功！';
  }

  @ApiTags('删除角色')
  @Delete('delete')
  async delete(@Query(new ValidatorPipe()) dto: RoleDto) {
    try {
      const { role_id } = dto;
      this.service.delete({ role_id });
    } catch (error) {
      console.error(error);
    }
    return '删除角色成功！';
  }
}
