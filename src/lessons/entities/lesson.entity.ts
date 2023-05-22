import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Subject } from '../../subjects/entities/subject.entity';
import { ClassLesson } from '../../class/class-lesson.entity';
import { HelpRequest } from '../../help-request/entities/help-request.entity';
import { SolvedHelpRequest } from '../../help-request/entities/solved-help-request.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn() id: number;
  @Column({ nullable: false }) name: string;
  @Column({ type: 'longtext', nullable: false }) information: string;
  @Column({ nullable: false, default: 0 }) difficultyScore: number;
  @Column() subjectId: number;
  @ManyToOne(() => Subject, (sub) => sub.id, { nullable: false, eager: true })
  @JoinColumn({ name: 'subjectId' })
  subject: Subject;
  @OneToMany(() => ClassLesson, (cls) => cls.lesson)
  classSubject: ClassLesson[];
  @OneToMany(() => HelpRequest, (req) => req.lesson)
  helpRequests: HelpRequest[];
  @OneToMany(() => SolvedHelpRequest, (req) => req.lesson)
  solvedHelpRequests: SolvedHelpRequest[];
}
