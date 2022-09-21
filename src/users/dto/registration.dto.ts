<<<<<<< HEAD
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class RegistrationDto {
  @ApiProperty({ example: 'paul.mueller@mail.de' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '@ABC123' })
  password?: string;

  @ApiProperty({ example: 'Paul' })
  first_name?: string;

  @ApiProperty({ example: 'Mueller' })
  last_name?: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  token?: string;
}
=======
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class RegistrationDto {
  @ApiProperty({ example: 'paul.mueller@mail.de' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '@ABC123' })
  password?: string;

  @ApiProperty({ example: 'Paul' })
  first_name?: string;

  @ApiProperty({ example: 'Mueller' })
  last_name?: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  token?: string;
}
>>>>>>> 295ed2d180a730e98f8f94d9e8f005da8716094c
