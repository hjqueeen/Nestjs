import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from 'src/users/user.entity';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'login', description: 'User login' })
  @ApiCreatedResponse({ description: 'Login successful.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  async login(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<any> {
    return this.authService.login(authCredentialsDto);
  }

  @Post('logout')
  @ApiOperation({ summary: 'logout', description: 'User logout' })
  @ApiCreatedResponse({ description: 'Logout successful.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  async logout(): Promise<void> {
    return this.authService.logout();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getHello(@Request() req): string {
    //require an Bearer token, validate token
    return req.user;
  }

  @Get('api-key')
  @UseGuards(AuthGuard('api-key'))
  findOne() {
    // do something
  }
}
