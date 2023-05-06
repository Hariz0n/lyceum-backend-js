import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher) private teacherRepo: Repository<Teacher>,
  ) {}

  async getAllTeachers(): Promise<Teacher[]> {
    return this.teacherRepo.find();
  }

  async getTeacherById(id: number) {
    return this.teacherRepo.findOneBy({ id });
  }

  async getTeacherByEmail(email: string) {
    return this.teacherRepo.findOneBy({ email });
  }

  async addTeacher(teacher: Partial<Teacher>): Promise<Teacher> {
    const newTeacher = this.teacherRepo.create(teacher);
    return await this.teacherRepo.save(newTeacher);
  }
}
