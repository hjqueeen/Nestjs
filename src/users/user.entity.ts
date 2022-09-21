<<<<<<< HEAD
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Photo } from '../photos/photo.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column()
  salt: string;

  @Column()
  name: string;

  @Column()
  username: string;

  // @OneToMany(type => Photo, photo => photo.user)
  // photos: Photo[];
}
=======
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Photo } from '../photos/photo.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column()
  salt: string;

  @Column()
  name: string;

  @Column()
  username: string;

  // @OneToMany(type => Photo, photo => photo.user)
  // photos: Photo[];
}
>>>>>>> 295ed2d180a730e98f8f94d9e8f005da8716094c
