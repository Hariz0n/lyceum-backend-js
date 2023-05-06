import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ClassSubjectTeacher } from '../class/class-subject-teacher.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn() id: number;
  @Column() firstName: string;
  @Column() lastName: string;
  @Column({ default: '' }) middleName: string;
  @Column({ unique: true }) email: string;
  @Column({ nullable: false }) @Exclude() passwordHash: string;
  @Column({ default: '' }) photoPath: string;
  @OneToMany(() => ClassSubjectTeacher, (cst) => cst.teacher)
  classSubjectTeacher: ClassSubjectTeacher[];
}
