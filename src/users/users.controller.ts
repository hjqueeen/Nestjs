import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get users' })
  @ApiOkResponse({ description: 'Getting users succesful', type: UserDto })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiForbiddenResponse({ description: 'Forbidden request.' })
  @UseGuards(AuthGuard('jwt'))
  getUsers(
    @Query(ValidationPipe) userFilterDto: UserDto,
  ): Promise<{ data: User[]; total: number }> {
    return this.userService.getUsers(userFilterDto);
  }
}
