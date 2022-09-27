import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNumber, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({ example: '51360124' })
  @IsNumber()
  id: number;

  @ApiProperty({
    example: 'paul.mueller@mail.de',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Paul' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Pengueen' })
  @IsString()
  username: string;
}
