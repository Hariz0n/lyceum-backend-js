import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { EditLessonDto } from './dto/edit-lesson.dto';
import { ClassLesson } from '../class/class-lesson.entity';
import { UnattachClassDto } from './dto/unattach-class.dto';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson) private lessonsRepo: Repository<Lesson>,
    @InjectRepository(ClassLesson)
    private classLessonRepo: Repository<ClassLesson>,
  ) {}

  async getAllLessons(subjectId: number) {
    return this.lessonsRepo.find({
      where: { subject: { id: subjectId } },
      relations: {
        subject: true,
      },
    });
  }

  async getLessonById(id: number) {
    return this.lessonsRepo.findOne({
      where: { id },
      relations: {
        subject: true,
      },
    });
  }

  async getClassLessonsById(id: number, subjectId?: number) {
    return this.lessonsRepo.find({
      where: {
        subjectId,
        classSubject: {
          classId: id,
        },
      },
      relations: {
        subject: true,
      },
    });
  }

  async createLesson(lesson: CreateLessonDto): Promise<Lesson> {
    const newLesson = this.lessonsRepo.create(lesson);
    return this.lessonsRepo.save(newLesson);
  }

  async removeLesson(id: number) {
    return this.lessonsRepo.delete({ id });
  }

  async editLesson(id: number, dto: EditLessonDto) {
    return this.lessonsRepo.update(id, dto);
  }

  async attachClass(lessonId: number, classId: number) {
    const newAttach = this.classLessonRepo.create({
      classId,
      lessonId,
    });
    return this.classLessonRepo.save(newAttach);
  }

  async unAttachClass(unattachClassDto: UnattachClassDto) {
    const user = await this.classLessonRepo.findOne({
      where: {
        lesson: {
          id: unattachClassDto.lessonId,
        },
        class: {
          id: unattachClassDto.classId,
        },
      },
    });

    return this.classLessonRepo.delete(user);
  }
}
