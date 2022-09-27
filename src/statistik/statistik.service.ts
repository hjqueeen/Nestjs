import { Injectable } from '@nestjs/common';
import { ActivityDto } from 'src/statistik/dto/activity.dto';
import { Connection } from 'typeorm';
import { UsersRepository } from '../users/users.repository';

// export type User = {
//   id: number;
//   name: string;
//   username: string;
//   password: string;
// };

@Injectable()
export class StatistikService {
  private usersRepository: UsersRepository;

  constructor(private connection: Connection) {
    this.usersRepository = this.connection.getCustomRepository(UsersRepository);
  }

  async getActivity(): Promise<any> {
    const allUsers = await this.usersRepository.find();

    return {
      allUsers,
      item: 0,
      min: { value: 0 },
      max: { value: allUsers.length ?? 0 },
    };
  }
}
