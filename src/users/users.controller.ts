import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { RegistrationDto } from './dto/registration.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get users' })
  @ApiCreatedResponse({ description: 'Getting users succesful', type: UserDto })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiForbiddenResponse({ description: 'Forbidden request.' })
  @UseGuards(AuthGuard('jwt'))
  getUsers(
    @Query(ValidationPipe) userFilterDto: UserDto,
  ): Promise<{ data: User[]; total: number }> {
    return this.usersService.getUsers(userFilterDto);
  }

  @Post('/registration')
  @ApiOperation({
    summary: 'Registration',
    description: 'Registration with body data',
  })
  @ApiCreatedResponse({ description: 'Registration successful.' })
  @ApiConflictResponse({ description: 'E-Mail already exists.' })
  async registration(
    @Body(ValidationPipe) registrationDto: RegistrationDto,
  ): Promise<RegistrationDto> {
    return this.usersService.registration(registrationDto);
  }
}
