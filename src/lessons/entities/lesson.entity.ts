import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Subject } from './subject.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn() id: string;
  @Column() name: string;
  @Column('longtext') information: string;
  @Column() difficultyScore: number;
  @ManyToOne(() => Subject, (sub) => sub) subject: Subject;
}
