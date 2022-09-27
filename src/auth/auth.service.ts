import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
import { Connection } from 'typeorm';
import { UsersService } from '../users/users.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  private usersRepository: UsersRepository;

  constructor(
    private connection: Connection,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    this.usersRepository = this.connection.getCustomRepository(UsersRepository);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(authCredentialsDto: AuthCredentialsDto) {
    const repoUser = await this.usersRepository.findOne({
      email: authCredentialsDto.email,
    });

    if (repoUser) {
      const payload = await this.usersRepository.validateUserPassword(
        authCredentialsDto,
        repoUser,
      );

      if (!payload) {
        throw new UnauthorizedException('Invalid credential');
      }

      // Sigh payload to create acces token
      const acces_token = this.jwtService.sign(payload);

      // update LoginDate
      this.usersRepository.updateLoginDate(repoUser);

      // Return LoginResponse
      return {
        accesToken: acces_token,
        user: repoUser,
      };
    } else {
      throw new NotFoundException();
    }
  }

  async logout(): Promise<void> {
    return null;
  }
}
