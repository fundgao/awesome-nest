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

  async findOne(params: any) {
    return await this.entity.findOne({
      where: params,
    });
  }

  async create(params: any) {
    const item = await this.entity.create(params);
    return this.entity.save(item);
  }

  async update({ role_id, ...params }: any) {
    const item = await this.findOne({ role_id });
    const newItem = await this.entity.merge(item, params);
    return this.entity.save(newItem);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
