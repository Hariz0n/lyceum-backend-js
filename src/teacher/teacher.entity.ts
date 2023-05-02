import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn() id: number;
  @Column() firstName: string;
  @Column() lastName: string;
  @Column({ default: '' }) middleName: string;
  @Column({ unique: true }) email: string;
  @Column({ nullable: false }) passwordHash: string;
  @Column({ default: '' }) photoPath: string;
}
