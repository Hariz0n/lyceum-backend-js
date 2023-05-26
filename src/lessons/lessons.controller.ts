import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { EditLessonDto } from './dto/edit-lesson.dto';
import { ApiTags } from '@nestjs/swagger';
import { UnattachClassDto } from './dto/unattach-class.dto';

@Controller('lessons')
export class LessonsController {
  constructor(private lessonsService: LessonsService) {}

  @Get()
  @ApiTags('Lessons')
  getLessons(@Query('subjectId') subjectId?: number) {
    return this.lessonsService.getAllLessons(subjectId);
  }

  @Get('/class/:id')
  @ApiTags('Lessons')
  getClassLessonsById(
    @Param('id', ParseIntPipe) id: number,
    @Query('subjectId') subjectId?: number,
  ) {
    return this.lessonsService.getClassLessonsById(id, subjectId);
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

  @Delete('unattach-class')
  @ApiTags('Lessons')
  deleteLesson(@Body() unattachClassDto: UnattachClassDto) {
    return this.lessonsService.unAttachClass(unattachClassDto);
  }
}
