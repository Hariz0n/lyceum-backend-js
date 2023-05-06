import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './class.entity';
import { ClassService } from './class.service';
import { ClassSubjectTeacher } from './class-subject-teacher.entity';
import { ClassLesson } from './class-lesson.entity';

@Module({
  controllers: [ClassController],
  imports: [
    TypeOrmModule.forFeature([Class, ClassSubjectTeacher, ClassLesson]),
  ],
  providers: [ClassService],
  exports: [ClassService],
})
export class ClassModule {}
