import { Controller, Get, Param, Query } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  getBooks() {
    return this.booksService.getBooks();
  }

  @Get('search')
  searchBooks(@Query('data') searchData: string) {
    console.log(searchData);
    return this.booksService.search(searchData);
  }

  @Get(':id')
  getBookById(@Param() params: { id: string }, @Query('isFull') isFull) {
    return this.booksService.getFullBookById(
      Number(params.id),
      isFull !== undefined,
    );
  }
}
