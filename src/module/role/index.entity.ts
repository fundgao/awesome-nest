import { BaseEntity } from '@/config/BaseEntity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role extends BaseEntity {
  // 自增主键
  @PrimaryGeneratedColumn()
  id: number;

  // 角色名称
  @Column()
  role_name: string;

  // 父级ID
  @Column()
  parent_id: number;

  // 角色描述
  @Column()
  description: string;
}
