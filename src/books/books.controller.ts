import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';
import { RolesGuard } from '../auth/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.teacher)
  @ApiTags('Books')
  @ApiBearerAuth()
  @Get()
  getBooks() {
    return this.booksService.getBooks();
  }

  @ApiTags('Books')
  @ApiBearerAuth()
  @Get('search')
  searchBooks(@Query('data') searchData: string) {
    return this.booksService.search(searchData);
  }

  @ApiTags('Books')
  @ApiBearerAuth()
  @Get(':id')
  getBookById(
    @Param('id', ParseIntPipe) id: number,
    @Query('isFull') isFull: boolean,
  ) {
    return this.booksService.getFullBookById(id, isFull !== undefined);
  }
}
