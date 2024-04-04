import { BaseEntity } from '@/config/BaseEntity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: string;

  @Column()
  user_name: string;

  @Column({
    default: '',
  })
  password: string;

  @Column({
    default: '',
  })
  role_id: string;

  @Column({
    default: '',
  })
  nickname: string;

  @Column({
    default: '',
  })
  phone_number: string;

  @Column({
    default: '',
  })
  email: string;

  @Column({
    default: '',
  })
  avatar: string;

  @Column()
  description: string;
}
