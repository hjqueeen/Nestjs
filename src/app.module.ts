import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
import { ConfigModule } from '@nestjs/config';
import { StatistikModule } from './statistik/statistik.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot(config),
    ConfigModule.forRoot(),
    StatistikModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
