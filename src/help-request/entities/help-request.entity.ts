import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from '../../student/student.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';

@Entity()
export class HelpRequest {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Lesson, (lsn) => lsn.helpRequests, { eager: true })
  lesson: Lesson;
  @ManyToOne(() => Student, (student) => student.helpRequests, { eager: true })
  applicant: Student;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startDate: string;
  @Column()
  description: string;
}
