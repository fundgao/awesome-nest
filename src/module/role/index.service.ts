import { Injectable } from '@nestjs/common';
import { Role } from './index.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { whereEqual, whereLike } from '@/utils/sql';

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

  async page({ params, option }: any) {
    const query = await this.entity.createQueryBuilder().select(
      `
      role_id,
      role_name,
      description,
      `,
    ).where(`
      ${whereEqual('role_id', option.role_id)}
      ${whereLike('role_name', option.role_name)}
      1 = 1
    `);
    const total = await query.getCount();
    const records = await query
      .limit(params.pageSize)
      .offset(params.offset)
      .getRawMany();
    return { records, total };
  }

  async delete({ role_id }: any){
    const item = await this.findOne({ role_id });
    if (!!item) {
      return this.entity.delete({ role_id });
    }
    return '数据不存在，删除失败！';
  }

  async findAll(option: any) {
    const query = await this.entity.createQueryBuilder().select(
      `
      role_id,
      role_name,
      description,
      `,
    ).where(`
      ${whereEqual('role_id', option.role_id)}
      ${whereLike('role_name', option.role_name)}
      1 = 1
    `);
    return await query.getRawMany();
  }
}
