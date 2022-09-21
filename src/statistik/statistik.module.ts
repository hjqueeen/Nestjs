import { Module } from '@nestjs/common';
import { StatistikController } from './statistik.controller';
import { StatistikService } from './statistik.service';

@Module({
  providers: [StatistikService],
  controllers: [StatistikController],
})
export class StatistikModule {}
