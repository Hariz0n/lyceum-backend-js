import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiTags('Student')
  getStudents() {
    return this.studentService.getAllStudents();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @ApiTags('Student')
  getStudent(@Param('id') id: string) {
    return this.studentService.getStudentById(Number(id));
  }
}
