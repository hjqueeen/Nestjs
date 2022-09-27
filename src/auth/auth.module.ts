import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { HeaderApiKeyStrategy } from './auth-header-api-key.strategy';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '../users/users.repository';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'SECRET', // put env variables
      signOptions: { expiresIn: '60s' },
    }),
    // TypeOrmModule.forFeature([UsersRepository]),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, HeaderApiKeyStrategy],

  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
