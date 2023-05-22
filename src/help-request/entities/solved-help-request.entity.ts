import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from '../../student/student.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';

@Entity()
export class SolvedHelpRequest {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Student, (std) => std.solvedHelpRequests, { eager: true })
  applicant: Student;
  @ManyToOne(() => Student, (std) => std.mentoredHelpRequests, { eager: true })
  mentor: Student;
  @ManyToOne(() => Lesson, (lsn) => lsn.solvedHelpRequests, { eager: true })
  lesson: Lesson;
  @Column()
  description: string;
  @Column()
  message: string;
  @Column({ type: 'timestamp', nullable: false })
  startDate: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  endDate: string;
  @Column({ default: false })
  isRejected: boolean;
}
