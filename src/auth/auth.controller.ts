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
  signIn(
    @Body('email') email: string,
    @Body('password') pass: string,
    @Body('type') type: 'student' | 'teacher',
  ) {
    if (email && pass) {
      return this.authService.login(email, pass, type);
    }
    throw new BadRequestException();
  }

  @Post('register')
  signUp(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('type') type: 'student' | 'teacher',
  ) {
    if (firstName && lastName && email && password && type) {
      return this.authService.register({
        firstName,
        lastName,
        email,
        password,
        type,
      });
    }
    throw new BadRequestException();
  }
}
