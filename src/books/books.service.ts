import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Like, Repository } from 'typeorm';
import { BookModule } from './bookModule.entity';
import { BookSubmodule } from './bookSubmodule.entity';
import { Paragraph } from './paragraph.entity';
import { BooksExpDto } from './dtos/booksExp.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepo: Repository<Book>,
    @InjectRepository(BookModule)
    private bookModuleRepo: Repository<BookModule>,
    @InjectRepository(BookSubmodule)
    private bookSubmoduleRepo: Repository<BookSubmodule>,
    @InjectRepository(Paragraph) private paragraphRepo: Repository<Paragraph>,
  ) {}

  async getBooks() {
    return this.bookRepo.find();
  }

  async getFullBookById(id: number, isFull = false): Promise<BooksExpDto> {
    const book = await this.bookRepo.findOne({
      where: { id },
      relations: isFull
        ? ['modules', 'modules.subModules', 'modules.subModules.paragraphs']
        : null,
    });
    if (!book) {
      throw new NotFoundException();
    }
    return book;
  }

  async search(data: string): Promise<BooksExpDto[]> {
    const book = await this.bookRepo.find({
      relations: {
        modules: {
          subModules: {
            paragraphs: true,
          },
        },
      },
      where: [
        { name: Like(`%${data}%`) },
        {
          modules: [
            { name: Like(`%${data}%`) },
            {
              subModules: [
                { name: Like(`%${data}%`) },
                {
                  paragraphs: {
                    data: Like(`%${data}%`),
                  },
                },
              ],
            },
          ],
        },
      ],
    });
    if (!book) {
      throw new NotFoundException();
    }
    return book;
  }
}
