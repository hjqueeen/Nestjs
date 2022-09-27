import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AuthCredentialsDto {
  @ApiProperty({ example: 'paul.mueller@mail.de' })
  @IsEmail()
  email?: string;

  @ApiProperty({ example: '@ABC123' })
  password?: string;
}
