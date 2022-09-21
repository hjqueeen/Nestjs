<<<<<<< HEAD
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({ example: '51360124' })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'Paul' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Pengueen' })
  @IsString()
  username: string;
}
=======
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({ example: '51360124' })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'Paul' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Pengueen' })
  @IsString()
  username: string;
}
>>>>>>> 295ed2d180a730e98f8f94d9e8f005da8716094c
