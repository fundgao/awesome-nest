import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from './index.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { whereEqual, whereLike } from '@/utils/sql';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { JWT_CONSTANYS } from '@/constants/common';

@Injectable()
export default class TheService {
  constructor(
    @InjectRepository(User)
    private readonly entity: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findOne(params: any) {
    return await this.entity.findOne({
      where: params,
    });
  }

  async create(params: any) {
    // 密码加密
    const password = await hash(params.password);
    const item = await this.entity.create({ ...params, password });
    return this.entity.save(item);
  }

  async update({ user_id, ...params }: any) {
    const item = await this.findOne({ user_id });
    if (!!item) {
      let newItem;
      if ('password' in params) {
        const password = await hash(params.password);
        newItem = await this.entity.merge(item, { ...params, password });
      } else {
        newItem = await this.entity.merge(item, params);
      }
      return this.entity.save(newItem);
    } else {
      return '用户不存在';
    }
  }

  // 注意 最后的,号
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
      description
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

  // 注意 最后的,号
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
      description
      `,
    ).where(`
      ${whereEqual('user_id', option.user_id)}
      ${whereEqual('role_id', option.role_id)}
      ${whereLike('user_name', option.user_name)}
      1 = 1
    `);
    return await query.getRawMany();
  }

  async findUserPermission(user: any) {
    // TODO
    return [];
  }

  async login(username: string, password: string): Promise<any> {
    const user = await this.findOne({ username });
    if (!user || !(await verify(user.password, password))) {
      throw new BadRequestException('用户不存在或密码错误！');
    }
    // 查询用户权限，并存在 payload
    const permission = await this.findUserPermission(user);
    const payload = { username, permission };
    return {
      msg: '登录成功',
      user: {
        username,
        nickname: user.nickname,
        email: user.email,
        avatar: user.avatar,
      },
      token: await this.jwtService.signAsync(payload, {
        secret: JWT_CONSTANYS.secret,
      }),
    };
  }
}
