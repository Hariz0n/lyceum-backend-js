import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Lesson } from './lesson.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @OneToMany(() => Lesson, (lesson) => lesson.subject) lessons: Lesson[];
}
