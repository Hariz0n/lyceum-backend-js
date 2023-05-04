import {
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

@Injectable()
export class AuthService {
  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService,
    private jwtService: JwtService,
  ) {}
  async login(email: string, pass: string, type: 'student' | 'teacher') {
    let user: Student | Teacher;
    switch (type) {
      case 'student':
        user = await this.studentService.getStudentByEmail(email);
        if (!user || !(await bcrypt.compare(pass, user.passwordHash))) {
          throw new UnauthorizedException();
        }
        break;
      case 'teacher':
        user = await this.teacherService.getTeacherByEmail(email);
        if (!user || !(await bcrypt.compare(pass, user.passwordHash))) {
          throw new UnauthorizedException();
        }
        break;
      default:
        throw new HttpException('Wrong type', HttpStatus.BAD_REQUEST);
    }

    const payload = { email: user.email, sub: user.id, type: type };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(user: {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    type: 'student' | 'teacher';
  }): Promise<{ access_token: string }> {
    let existingUser: Student | Teacher;
    switch (user.type) {
      case 'student':
        existingUser = await this.studentService.getStudentByEmail(user.email);
        break;
      case 'teacher':
        existingUser = await this.teacherService.getTeacherByEmail(user.email);
        break;
      default:
        throw new UnauthorizedException();
    }
    if (existingUser) {
      throw new HttpException('User is existing', HttpStatus.BAD_REQUEST);
    }
    const passHash = await bcrypt.hash(user.password, 12);
    switch (user.type) {
      case 'student':
        const addedStudent = await this.studentService.addStudent({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          passwordHash: passHash,
        });
        return {
          access_token: await this.jwtService.signAsync({
            id: addedStudent.id,
            email: addedStudent.email,
            type: user.type,
          }),
        };
      case 'teacher':
        const addedTeacher = await this.teacherService.addTeacher({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          passwordHash: passHash,
        });
        return {
          access_token: await this.jwtService.signAsync({
            id: addedTeacher.id,
            email: addedTeacher.email,
            type: user.type,
          }),
        };
      default:
        throw new UnauthorizedException();
    }
  }
}
