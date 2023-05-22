import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookModule } from './bookModule.entity';
import { Subject } from '../subjects/entities/subject.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @Column() year: number;

  @OneToMany(() => BookModule, (bsm) => bsm.book)
  modules: BookModule[];
  @ManyToOne(() => Subject, (sbj) => sbj.books) subject: Subject;
}
