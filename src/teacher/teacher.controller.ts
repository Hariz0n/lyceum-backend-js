import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('teacher')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  @Get()
  @ApiTags('Teacher')
  @UseInterceptors(ClassSerializerInterceptor)
  getAllTeachers() {
    return this.teacherService.getAllTeachers();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.teacher, Role.student)
  @Get(':id')
  @ApiTags('Teacher')
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  getTeacherById(@Param('id', ParseIntPipe) id: number) {
    return this.teacherService.getTeacherById(id);
  }
}
