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

  // 角色ID
  @Column()
  role_id: string;

  // 角色描述
  @Column({
    default: '',
  })
  description: string;
}
