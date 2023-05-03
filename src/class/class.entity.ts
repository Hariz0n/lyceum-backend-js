import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from '../student/student.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @Column() grade: number;
  @OneToMany(() => Student, (student) => student.class) students: Student[];
}
