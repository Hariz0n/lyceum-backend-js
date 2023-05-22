import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Subject } from '../subjects/entities/subject.entity';
import { ClassModule } from '../class/class.module';
import { ClassLesson } from '../class/class-lesson.entity';

@Module({
  providers: [LessonsService],
  controllers: [LessonsController],
  imports: [
    TypeOrmModule.forFeature([Lesson, Subject, ClassLesson]),
    ClassModule,
  ],
})
export class LessonsModule {}
