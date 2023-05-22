import { Module } from '@nestjs/common';
import { SubjectsController } from './subjects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { SubjectsService } from './subjects.service';

@Module({
  controllers: [SubjectsController],
  imports: [TypeOrmModule.forFeature([Subject])],
  providers: [SubjectsService],
})
export class SubjectsModule {}
