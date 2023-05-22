import { Controller, Get } from '@nestjs/common';
import { SubjectsService } from './subjects.service';

@Controller('subjects')
export class SubjectsController {
  constructor(private subjectService: SubjectsService) {}
  @Get()
  getAllSubjects() {
    return this.subjectService.getAllStudents();
  }
}
