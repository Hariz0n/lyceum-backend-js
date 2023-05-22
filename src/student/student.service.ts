import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dtos/create-student.dto';

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
  async getStudentById(id: number) {
    return this.studentRepo.findOne({
      where: { id },
      relations: {
        class: {
          classLesson: {
            lesson: {
              subject: true,
            },
          },
        },
      },
    });
  }

  async addStudent(user: CreateStudentDto): Promise<Student> {
    const newStudent = this.studentRepo.create(user);
    return this.studentRepo.save(newStudent);
  }
}
