import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BookModule } from './bookModule.entity';
import { BookSubmodule } from './bookSubmodule.entity';
import { Paragraph } from './paragraph.entity';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, BookModule, BookSubmodule, Paragraph]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
