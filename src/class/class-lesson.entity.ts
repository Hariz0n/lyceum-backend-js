import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Class } from './class.entity';
import { Lesson } from '../lessons/entities/lesson.entity';

@Entity()
export class ClassLesson {
  @PrimaryGeneratedColumn() id: number;
  @Column() classId: number;
  @Column() lessonId: number;
  @ManyToOne(() => Class, (cls) => cls.classLesson)
  @JoinColumn({ name: 'classId' })
  class: Class;
  @ManyToOne(() => Lesson, (sbj) => sbj.classSubject)
  @JoinColumn({ name: 'lessonId' })
  lesson: Lesson;
}
