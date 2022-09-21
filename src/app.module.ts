import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
import { ConfigModule } from '@nestjs/config';
<<<<<<< HEAD
import { StatistikModule } from './statistik/statistik.module';
=======
>>>>>>> 295ed2d180a730e98f8f94d9e8f005da8716094c

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot(config),
    ConfigModule.forRoot(),
<<<<<<< HEAD
    StatistikModule,
=======
>>>>>>> 295ed2d180a730e98f8f94d9e8f005da8716094c
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
