import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BookSubmodule } from './bookSubmodule.entity';

@Entity()
export class Paragraph {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: 'longtext' }) data: string;
  @ManyToOne(() => BookSubmodule, (bsm) => bsm.module, { onDelete: 'CASCADE' })
  subModule: BookSubmodule;
}
