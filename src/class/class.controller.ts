import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ClassService } from './class.service';

@Controller('class')
export class ClassController {
  constructor(private classService: ClassService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getClassById(@Param('id') id: string) {
    return this.classService.getClassById(Number(id));
  }
}
