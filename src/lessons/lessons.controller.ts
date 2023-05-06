import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { EditLessonDto } from './dto/edit-lesson.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('lessons')
export class LessonsController {
  constructor(private lessonsService: LessonsService) {}

  @Get()
  @ApiTags('Lessons')
  getLessons() {
    return this.lessonsService.getAllLessons();
  }

  @Post(':id/attachClass')
  @ApiTags('Lessons')
  attachClass(
    @Query('classId') classId: string,
    @Param('id') lessonId: string,
  ) {
    return this.lessonsService.attachClass(Number(lessonId), Number(classId));
  }

  @Get(':id')
  @ApiTags('Lessons')
  getLessonById(@Param('id') id: string) {
    return this.lessonsService.getLessonById(Number(id));
  }

  @Post()
  @ApiTags('Lessons')
  addLesson(@Body() lesson: CreateLessonDto) {
    console.log(lesson);
    return this.lessonsService.createLesson(lesson);
  }

  @Patch(':id')
  @ApiTags('Lessons')
  editLesson(@Param('id') id: string, @Body() editDto: EditLessonDto) {
    return this.lessonsService.editLesson(Number(id), editDto);
  }

  @Delete()
  @ApiTags('Lessons')
  deleteLesson(@Query('id') id) {
    return this.lessonsService.removeLesson(id);
  }
}
