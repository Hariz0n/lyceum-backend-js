import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Class } from '../class/class.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn() id: number;
  @Column() firstName: string;
  @Column() lastName: string;
  @Column({ default: '' }) middleName: string;
  @Column({ unique: true }) email: string;
  @Column({ nullable: false }) passwordHash: string;
  @Column({ default: '' }) photoPath: string;
  @ManyToOne(() => Class, (cls) => cls.id) classId: number;
}
