import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson) private lessonsRepo: Repository<Lesson>,
  ) {}

  async getAllLessons() {
    return this.lessonsRepo.find({
      relations: {
        subject: true,
      },
    });
  }
}
