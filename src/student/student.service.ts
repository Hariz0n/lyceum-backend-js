import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>,
  ) {}

  async getAllStudents(): Promise<Student[]> {
    return this.studentRepo.find();
  }

  async getStudentByEmail(email: string) {
    return this.studentRepo.findOneBy({ email });
  }

  async addStudent(user: Partial<Student>): Promise<Student> {
    const newStudent = this.studentRepo.create(user);
    return this.studentRepo.save(newStudent);
  }
}
