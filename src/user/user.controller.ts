import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  getUsers() {
    return this.userService.getAllUsers();
  }

  @Post('add')
  async addUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('photoPath') photoPath: string,
    @Body('password') password: string,
  ) {
    try {
      return await this.userService.addUser({
        name,
        email,
        photoPath,
        password,
      });
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
