import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ClassService } from './class.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('class')
export class ClassController {
  constructor(private classService: ClassService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiTags('Class')
  @Get(':id')
  getClassById(@Param('id') id: string) {
    return this.classService.getClassById(Number(id));
  }
}
