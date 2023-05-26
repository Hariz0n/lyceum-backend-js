import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookModule } from './bookModule.entity';
import { Paragraph } from './paragraph.entity';

@Entity()
export class BookSubmodule {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @ManyToOne(() => BookModule, (bm) => bm.subModules, { onDelete: 'CASCADE' })
  module: BookModule;
  @OneToMany(() => Paragraph, (prg) => prg.subModule) paragraphs: Paragraph[];
}
