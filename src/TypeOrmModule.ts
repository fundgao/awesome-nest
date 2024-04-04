import { TypeOrmModule } from '@nestjs/typeorm';
import globalEnv from '@/config/env/globalEnv';
import { Role } from '@/module/role/index.entity';
import { User } from '@/module/user/index.entity';

export default TypeOrmModule.forRoot({
  type: 'mysql',
  host: globalEnv.DB_HOST,
  port: globalEnv.DB_PORT,
  username: globalEnv.DB_USERNAME,
  password: globalEnv.DB_PASSWORD,
  database: globalEnv.DB_DATABASE,
  entities: [User, Role], // 表实体
  synchronize: true, // 根据实体创建表结构
  logging: ['error'],
});
