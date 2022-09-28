import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { UsersRepository } from '../users/users.repository';
import { NewSubscriberDto, VisitorDto } from './dto/activity.dto';

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

  async getThisMonthsVisitor(): Promise<VisitorDto> {
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

  async getNewSubscriber(): Promise<NewSubscriberDto> {
    const allUsers = await this.usersRepository.find();
    let newSubscriber = 0;

    allUsers.map((user) => {
      const today = new Date();
      const prev_7day = today.setDate(today.getDate() - 7);
      if (user.registrationDate) {
        if (+user.registrationDate > prev_7day) {
          newSubscriber += 1;
        }
      }
    });

    return {
      subscriber: newSubscriber,
    };
  }
}
