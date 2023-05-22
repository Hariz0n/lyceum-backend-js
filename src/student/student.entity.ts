import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Class } from '../class/class.entity';
import { Exclude } from 'class-transformer';
import { HelpRequest } from '../help-request/entities/help-request.entity';
import { SolvedHelpRequest } from '../help-request/entities/solved-help-request.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn() id: number;
  @Column() firstName: string;
  @Column() lastName: string;
  @Column({ default: '' }) middleName: string;
  @Column({ unique: true }) email: string;
  @Column({ nullable: false })
  @Exclude()
  passwordHash: string;
  @Column({ default: '' }) photoPath: string;
  @ManyToOne(() => Class, (cls) => cls.students) class: Class;
  @OneToMany(() => HelpRequest, (req) => req.applicant)
  helpRequests: HelpRequest[];
  @OneToMany(() => SolvedHelpRequest, (shr) => shr.applicant)
  solvedHelpRequests: SolvedHelpRequest[];
  @OneToMany(() => SolvedHelpRequest, (shr) => shr.mentor)
  mentoredHelpRequests: SolvedHelpRequest[];
}
