import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { UsersRepository } from '../users/users.repository';
import { NewSubscriberDto, VisitorDto } from './dto/statistik.dto';

@Injectable()
export class StatistikService {
  private usersRepository: UsersRepository;

  constructor(private connection: Connection) {
    this.usersRepository = this.connection.getCustomRepository(UsersRepository);
  }

  async getVisitorThisMonth(): Promise<VisitorDto> {
    const allUsers = await this.usersRepository.find();
    let thisMonthsVisitor = 0;

    allUsers.map((user) => {
      const today = new Date();
      const prev_30day = today.setDate(today.getDate() - 30);
      if (user.last_login) {
        if (+user.last_login > prev_30day) {
          thisMonthsVisitor += 1;
        }
      }
    });

    return {
      green_marker: thisMonthsVisitor,
    };
  }

  async getNewSubscriber(): Promise<NewSubscriberDto> {
    const allUsers = await this.usersRepository.find();
    let newSubscriber = 0;

    allUsers.map((user) => {
      const today = new Date();
      const prev_7day = today.setDate(today.getDate() - 7);
      if (user.registration_date) {
        if (+user.registration_date > prev_7day) {
          newSubscriber += 1;
        }
      }
    });

    return {
      item: newSubscriber,
      min: { value: 0 },
      max: { value: allUsers.length ?? 0 },
    };
  }
}
