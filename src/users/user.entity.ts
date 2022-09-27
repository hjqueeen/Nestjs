import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

// import { Photo } from '../photos/photo.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column()
  salt: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  loginDate: Date;

  @Column({ nullable: true })
  registrationDate: Date;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);

    return hash === this.password;
  }

  async isUserThisWeek(today: Date): Promise<boolean> {
    const prev_7day = today.setDate(today.getDate() - 7);

    return +this.loginDate > prev_7day;
  }

  // @OneToMany(type => Photo, photo => photo.user)
  // photos: Photo[];
}
