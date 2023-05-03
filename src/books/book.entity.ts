import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BookModule } from './bookModule.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @Column() year: number;

  @OneToMany(() => BookModule, (bsm) => bsm.book)
  modules: BookModule[];
}
