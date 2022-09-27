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

  async getThisMonthsVisitor(): Promise<any> {
    const allUsers = await this.usersRepository.find();
    let thisMonthsVisitor = 0;

    allUsers.map((user) => {
      const today = new Date();
      const prev_30day = today.setDate(today.getDate() - 30);
      if (user.loginDate) {
        if (+user.loginDate > prev_30day) {
          thisMonthsVisitor += 1;
        }
      }
    });

    return {
      item: thisMonthsVisitor,
      min: { value: 0 },
      max: { value: allUsers.length ?? 0 },
    };
  }
}
