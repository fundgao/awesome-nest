import { Module } from '@nestjs/common';
import TheController from './index.controller';
import TheService from './index.service';
import { Role } from './index.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [TheController],
  providers: [TheService],
})
export default class TheModule {}
