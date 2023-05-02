import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(email: string, pass: string) {
    const user = await this.userService.getUserByEmail(email);
    // console.log(user.password, pass);
    // console.log(await bcrypt.hash(user.password, 12));
    // console.log(await bcrypt.compare(pass, user.password));
    if (!(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException();
    }

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(user: { name: string; password: string; email: string }) {
    const newUser = await this.userService.getUserByEmail(user.email);
    if (newUser) {
      throw new HttpException('Existing email', HttpStatus.BAD_REQUEST);
    }
    const passHash = await bcrypt.hash(user.password, 12);
    console.log(passHash);
    return await this.userService.addUser({
      name: user.name,
      email: user.email,
      password: passHash,
      photoPath: '',
    });
  }
}
