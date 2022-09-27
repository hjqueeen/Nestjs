// import { CustomRepository } from 'src/typeorm-ex/typeorm-ex.decorator';
import { EntityRepository, Repository } from 'typeorm';
import { RegistrationDto } from './dto/registration.dto';
import { User } from './user.entity';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtPayload } from '../auth/models/jwt-payload.interface';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';

// @CustomRepository(User) //@deprecated EntityRepository
@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async registration(
    registrationDto: RegistrationDto,
  ): Promise<RegistrationDto> {
    const { email, password } = registrationDto;

    const user = new User();
    user.email = email;
    // generate random pw
    // const randomNumber = this.getRandomArbitrary(0, 100);
    // const password = randomNumber + uuid();
    // generate salt
    user.salt = await bcrypt.genSalt();
    // hash password
    user.password = await this.hashPassword(password, user.salt);
    // registration date
    const date = new Date();
    user.registrationDate = date;

    try {
      await user.save();
      return { email };
    } catch (error) {
      //Duplicate email
      if (error.code === '23505') {
        throw new ConflictException('E-Mail already exists');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }

  /**
   * Hash password using bcrypt.
   * @param password Password
   * @param salt Salt
   */
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  /**
   * Validate user password.
   * @param authCredentialsDto AuthCredentialsDto
   */
  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
    repoUser: User,
  ): Promise<JwtPayload> {
    const payload = {
      id: repoUser.id,
      email: repoUser.email,
    };
    if (await repoUser.validatePassword(authCredentialsDto.password)) {
      return payload;
    } else {
      throw new BadRequestException();
    }
  }

  /**
   * update login date.
   * @param id User id
   * @param loginDateDto LoginDateDto
   * @param user User
   * @return loginDateDto
   */
  async updateLoginDate(user: User): Promise<Date> {
    const loginDate = new Date();

    // update LoginDate
    await this.update(user.id, { loginDate: loginDate });

    return loginDate;
  }

  private getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
}
