import { Module } from '@nestjs/common';
import TheController from './index.controller';
import TheService from './index.service';
import { User } from './index.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANYS } from '@/constants/common';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: JWT_CONSTANYS.secret, // 确保你提供了一个密钥
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [TheController],
  providers: [TheService],
})
export default class TheModule {}
