import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { ClassValidationPipe } from '../shared/class-validation.pipe';
import { RegisterDto } from './dtos/register.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiTags('Authentication')
  @Post('login')
  signIn(@Body(new ClassValidationPipe()) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiTags('Authentication')
  @Post('register')
  signUp(@Body(new ClassValidationPipe()) registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
