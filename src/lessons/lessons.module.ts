import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Subject } from './entities/subject.entity';

@Module({
  providers: [LessonsService],
  controllers: [LessonsController],
  imports: [TypeOrmModule.forFeature([Lesson, Subject])],
})
export class LessonsModule {}
