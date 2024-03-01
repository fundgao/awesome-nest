import { Injectable } from '@nestjs/common';
import { Role } from './index.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export default class TheService {
  constructor(
    @InjectRepository(Role)
    private readonly entity: Repository<Role>,
  ) {}

  // 查询单个
  async findOne(params: any) {
    return await this.entity.findOne({
      where: params,
    });
  }

  getHello(): string {
    return 'Hello World!';
  }
}
