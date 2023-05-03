import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from './class.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClassService {
  constructor(@InjectRepository(Class) private classRepo: Repository<Class>) {}

  getClassById(id: number) {
    return this.classRepo.findOne({
      where: { id },
      relations: {
        students: true,
      },
    });
  }
}
