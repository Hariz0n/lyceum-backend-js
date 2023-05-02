import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body('email') email: string, @Body('password') pass: string) {
    if (email && pass) {
      return this.authService.login(email, pass);
    }
    throw new BadRequestException();
  }

  @Post('register')
  signUp(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    if (name && email && password) {
      return this.authService.register({ name, email, password });
    }
    throw new BadRequestException();
  }
}
