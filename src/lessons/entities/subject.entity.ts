import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Lesson } from './lesson.entity';
import { ClassSubjectTeacher } from '../../class/class-subject-teacher.entity';
import { Book } from '../../books/book.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @OneToMany(() => Lesson, (lesson) => lesson.subject) lessons: Lesson[];
  @OneToMany(() => ClassSubjectTeacher, (cst) => cst.subject)
  classSubjectTeacher: ClassSubjectTeacher[];
  @OneToMany(() => Book, (book) => book.subject) books: Book[];
}
