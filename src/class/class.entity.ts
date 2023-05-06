import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from '../student/student.entity';
import { ClassSubjectTeacher } from './class-subject-teacher.entity';
import { ClassLesson } from './class-lesson.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @Column() grade: number;
  @OneToMany(() => Student, (student) => student.class) students: Student[];
  @OneToMany(() => ClassSubjectTeacher, (cst) => cst.cls)
  classSubjectTeacher: ClassSubjectTeacher[];
  @OneToMany(() => ClassLesson, (cs) => cs.class)
  classLesson: ClassLesson[];
}
