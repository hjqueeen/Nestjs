import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user: string;
}
