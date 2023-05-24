import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { StudentService } from '../student/student.service';
import { TeacherService } from '../teacher/teacher.service';
import { Student } from '../student/student.entity';
import { Teacher } from '../teacher/teacher.entity';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService,
    private jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto) {
    let user: Student | Teacher;
    switch (loginDto.type) {
      case 'student':
        user = await this.studentService.getStudentByEmail(loginDto.email);
        if (!user) {
          throw new UnauthorizedException({
            cause: 'noSuchUser',
            statusCode: 401,
          });
        } else if (
          !(await bcrypt.compare(loginDto.password, user.passwordHash))
        ) {
          throw new UnauthorizedException({
            cause: 'invalid password',
            statusCode: 401,
          });
        }
        break;
      case 'teacher':
        user = await this.teacherService.getTeacherByEmail(loginDto.email);
        if (
          !user ||
          !(await bcrypt.compare(loginDto.password, user.passwordHash))
        ) {
          throw new UnauthorizedException();
        }
        break;
      default:
        throw new BadRequestException({});
    }

    const payload = { email: user.email, sub: user.id, type: loginDto.type };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(registerDto: RegisterDto): Promise<{ access_token: string }> {
    let existingUser: Student | Teacher;
    switch (registerDto.type) {
      case 'student':
        existingUser = await this.studentService.getStudentByEmail(
          registerDto.email,
        );
        break;
      case 'teacher':
        existingUser = await this.teacherService.getTeacherByEmail(
          registerDto.email,
        );
        break;
      default:
        throw new UnauthorizedException();
    }
    if (existingUser) {
      throw new HttpException('User is existing', HttpStatus.BAD_REQUEST);
    }
    const passHash = await bcrypt.hash(registerDto.password, 12);
    switch (registerDto.type) {
      case 'student':
        const addedStudent = await this.studentService.addStudent({
          firstName: registerDto.firstName,
          lastName: registerDto.lastName,
          middleName: registerDto.middleName,
          email: registerDto.email,
          passwordHash: passHash,
        });
        return {
          access_token: await this.jwtService.signAsync({
            id: addedStudent.id,
            email: addedStudent.email,
            type: registerDto.type,
          }),
        };
      case 'teacher':
        const addedTeacher = await this.teacherService.addTeacher({
          firstName: registerDto.firstName,
          lastName: registerDto.lastName,
          email: registerDto.email,
          passwordHash: passHash,
        });
        return {
          access_token: await this.jwtService.signAsync({
            id: addedTeacher.id,
            email: addedTeacher.email,
            type: registerDto.type,
          }),
        };
      default:
        throw new UnauthorizedException();
    }
  }
}
