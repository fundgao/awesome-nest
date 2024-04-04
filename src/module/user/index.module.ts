import { Module } from '@nestjs/common';
import TheController from './index.controller';
import TheService from './index.service';
import { User } from './index.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [TheController],
  providers: [TheService],
})
export default class TheModule {}
