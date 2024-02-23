import { Module } from '@nestjs/common';
import { AppController } from './index.controller';
import { AppService } from './index.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
