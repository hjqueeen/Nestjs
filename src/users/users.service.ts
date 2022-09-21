import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
<<<<<<< HEAD
import { ActivityDto } from 'src/statistik/dto/activity.dto';
=======
>>>>>>> 295ed2d180a730e98f8f94d9e8f005da8716094c
import { RegistrationDto } from './dto/registration.dto';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

// export type User = {
//   id: number;
//   name: string;
//   username: string;
//   password: string;
// };

@Injectable()
export class UsersService {
  private readonly users: User[];
  // = [{
  //     id: 1,
  //     name: 'John',
  //     username: 'john',
  //     password: 'changeme',
  //   },
  //   {
  //     id: 2,
  //     name: 'Maria',
  //     username: 'maria',
  //     password: 'guess',
  //   },
  // ];

  constructor(
    @InjectRepository(User)
    private usersRepository: UsersRepository,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(username: string): Promise<User> {
    return this.usersRepository.findOne({ username });
  }

  async getUsers(
    userFilterDto: UserDto,
  ): Promise<{ data: User[]; total: number }> {
    return; //require fix
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async registration(registrationDto: RegistrationDto): Promise<any> {
    await this.usersRepository.registration(registrationDto);
  }
<<<<<<< HEAD

  async getActivity(): Promise<ActivityDto> {
    const allUsers = await this.usersRepository.find();
    return {
      item: 0,
      min: { value: 0 },
      max: { value: allUsers.length ?? 0 },
    };
  }
=======
>>>>>>> 295ed2d180a730e98f8f94d9e8f005da8716094c
}
