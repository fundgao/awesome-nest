import { Injectable } from '@nestjs/common';
import { User } from './index.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { whereEqual, whereLike } from '@/utils/sql';

@Injectable()
export default class TheService {
  constructor(
    @InjectRepository(User)
    private readonly entity: Repository<User>,
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

  async update({ user_id, ...params }: any) {
    const item = await this.findOne({ user_id });
    const newItem = await this.entity.merge(item, params);
    return this.entity.save(newItem);
  }

  async page({ params, option }: any) {
    const query = await this.entity.createQueryBuilder().select(
      `
      user_id,
      user_name,
      nickname,
      role_id,
      phone_number,
      email,
      avatar,
      description,
      `,
    ).where(`
      ${whereEqual('user_id', option.user_id)}
      ${whereEqual('role_id', option.role_id)}
      ${whereLike('user_name', option.user_name)}
      1 = 1
    `);
    const total = await query.getCount();
    const records = await query
      .limit(params.pageSize)
      .offset(params.offset)
      .getRawMany();
    return { records, total };
  }

  async delete({ user_id }: any) {
    const item = await this.findOne({ user_id });
    if (!!item) {
      return this.entity.delete({ user_id });
    }
    return '数据不存在，删除失败！';
  }

  async findAll(option: any) {
    const query = await this.entity.createQueryBuilder().select(
      `
      user_id,
      user_name,
      nickname,
      role_id,
      phone_number,
      email,
      avatar,
      description,
      `,
    ).where(`
      ${whereEqual('user_id', option.user_id)}
      ${whereEqual('role_id', option.role_id)}
      ${whereLike('user_name', option.user_name)}
      1 = 1
    `);
    return await query.getRawMany();
  }
}
