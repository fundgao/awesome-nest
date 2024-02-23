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
