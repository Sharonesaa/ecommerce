import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './LoginUserDto';
import { CreateUserDto } from '../users/CreateUser.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(200)
  async createUser(@Body() user: CreateUserDto, @Req() request: Request & { now: string }) {
    return this.authService.signUp(user);
  }

  @Post('signin')
  @HttpCode(200)
  async signIn(@Body() signInDto: LoginUserDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
