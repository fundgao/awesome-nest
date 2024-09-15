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
import { UserDto } from './index.dto';
import { getPageParams } from '@/config/BaseEntity';
import { v4 as uuidv4 } from 'uuid';
import { Public } from '@/utils/decorator/auth';

@ApiTags('用户管理')
@Controller('')
export default class TheController {
  constructor(private readonly service: TheService) {}

  @ApiTags('查询用户')
  @Get('user/id/:id')
  async getUser(@Query(new ValidatorPipe()) dto: UserDto) {
    const { user_id } = dto;
    return this.service.findOne({
      user_id,
    });
  }

  @ApiTags('分页')
  @Get('user/page')
  async page(@Query(new ValidatorPipe()) dto: UserDto) {
    const { params, option } = getPageParams(dto);
    return this.service.page({
      params,
      option,
    });
  }

  @ApiTags('分页')
  @Get('user/all')
  async all(@Query(new ValidatorPipe()) dto: UserDto) {
    const { user_id, role_id, username } = dto;
    return this.service.findAll({
      user_id,
      role_id,
      username,
    });
  }

  @ApiTags('新增用户')
  @Post('user/create')
  async create(@Query(new ValidatorPipe()) dto: UserDto) {
    const { username, description } = dto;
    if (!username) {
      throw new BadRequestException('用户名不能为空！');
    }
    try {
      const item = await this.service.findOne({ username });
      if (!!item) {
        throw new BadRequestException('该用户已存在！');
      } else {
        this.service.create({
          user_id: uuidv4(),
          username,
          description,
        });
      }
    } catch (error) {
      console.error(error);
    }
    return '创建用户成功！';
  }

  @ApiTags('更新用户')
  @Post('user/update')
  async update(@Query(new ValidatorPipe()) dto: UserDto) {
    try {
      this.service.update(dto);
    } catch (error) {
      console.error(error);
    }
    return '更新用户成功！';
  }

  @ApiTags('删除用户')
  @Delete('user/delete')
  async delete(@Query(new ValidatorPipe()) dto: UserDto) {
    try {
      const { user_id } = dto;
      this.service.delete({ user_id });
    } catch (error) {
      console.error(error);
    }
    return '删除用户成功！';
  }

  /**
   * 登出前端清除 Token 即可
   */
  @ApiTags('登录')
  @Post('login')
  @Public()
  async login(@Query(new ValidatorPipe()) dto: UserDto) {
    try {
      const { user_id } = dto;
      this.service.delete({ user_id });
    } catch (error) {
      console.error(error);
    }
    return '删除用户成功！';
  }
}
