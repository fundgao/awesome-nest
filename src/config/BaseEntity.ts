import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @CreateDateColumn({
    name: 'create_time',
  })
  createTime: Date;

  @UpdateDateColumn({
    name: 'update_time',
  })
  updateTime: Date;

  @Column({
    name: 'create_user',
  })
  createUser: string;

  @Column({
    name: 'update_user',
  })
  updateUser: string;

  @Column({
    default: false,
  })
  delete: boolean;
}

export const page_params = {
  pageSize: 10,
  pageIndex: 1,
};

export const getPageParams = (values: any) => {
  const params: any = {};
  const option: any = {};

  // 封装非分页参数
  Object.keys(values).forEach((key) => {
    if (!(key in page_params)) {
      let val = values[key];
      // 去掉空格
      if (typeof val === 'string') {
        val = val.trim();
      }
      option[key] = val;
    }
  });

  // 封装分页参数
  for (const p in page_params) {
    params[p] = Number(values[p] || '') || page_params[p];
  }
  params.offset = params.pageSize * (params.pageIndex - 1);
  return {
    params,
    option,
  };
};
