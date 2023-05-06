import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Subject } from './subject.entity';
import { ClassLesson } from '../../class/class-lesson.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn() id: number;
  @Column({ nullable: false }) name: string;
  @Column({ type: 'longtext', nullable: false }) information: string;
  @Column({ nullable: false, default: 0 }) difficultyScore: number;
  @Column() subjectId: number;
  @ManyToOne(() => Subject, (sub) => sub.id, { nullable: false })
  @JoinColumn({ name: 'subjectId' })
  subject: Subject;
  @OneToMany(() => ClassLesson, (cls) => cls.lesson)
  classSubject: ClassLesson[];
}
