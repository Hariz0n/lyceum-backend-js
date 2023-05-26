import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Book } from './book.entity';
import { BookSubmodule } from './bookSubmodule.entity';

@Entity()
export class BookModule {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @ManyToOne(() => Book, (book) => book.modules, { onDelete: 'CASCADE' })
  book: Book;
  @OneToMany(() => BookSubmodule, (bsm) => bsm.module)
  subModules: BookSubmodule[];
}
