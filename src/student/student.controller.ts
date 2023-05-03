import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getStudents() {
    return this.studentService.getAllStudents();
  }
}
