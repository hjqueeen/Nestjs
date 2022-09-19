import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
// import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
// import { TypeOrmExModule } from './typeorm-ex/typeorm-ex.module';
import { UsersRepository } from './users/users.repository';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot(config),
    // TypeOrmExModule.forCustomRepository([UsersRepository]),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // constructor(private dataSource: DataSource) {}
}
