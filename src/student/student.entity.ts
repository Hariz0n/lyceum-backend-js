import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Class } from '../class/class.entity';
import { Exclude } from 'class-transformer';

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
}
