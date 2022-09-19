// import { CustomRepository } from 'src/typeorm-ex/typeorm-ex.decorator';
import { EntityRepository, Repository } from 'typeorm';
import { RegistrationDto } from './dto/registration.dto';
import { User } from './user.entity';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

// @CustomRepository(User) //@deprecated EntityRepository
@EntityRepository()
export class UsersRepository extends Repository<User> {
  async registration(
    registrationDto: RegistrationDto,
  ): Promise<RegistrationDto> {
    const { email } = registrationDto;

    const user = new User();
    user.email = email;
    // generate random pw
    const randomNumber = this.getRandomArbitrary(5000, 9000);
    const data = new Date().toISOString;
    const password = randomNumber + data + uuid();
    // generate salt
    user.salt = await bcrypt.genSalt();
    // hash password
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
      return { email };
    } catch (error) {
      //Duplicate email
      if (error.code === '23505') {
        throw new ConflictException('E-Mail already exists');
      } else {
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

  private getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
}
