import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Class } from './class.entity';
import { Subject } from '../lessons/entities/subject.entity';
import { Teacher } from '../teacher/teacher.entity';

@Entity()
export class ClassSubjectTeacher {
  @PrimaryGeneratedColumn() id: number;
  @ManyToOne(() => Class, (cls) => cls.classSubjectTeacher)
  cls: Class;
  @ManyToOne(() => Subject, (subject) => subject.classSubjectTeacher)
  subject: Subject;
  @ManyToOne(() => Teacher, (teacher) => teacher.classSubjectTeacher)
  teacher: Teacher;
}
