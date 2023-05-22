import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject) private subjectsRepo: Repository<Subject>,
  ) {}

  async getAllStudents() {
    return this.subjectsRepo.find();
  }
}
