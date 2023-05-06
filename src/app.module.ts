import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';
import { ClassModule } from './class/class.module';
import { Class } from './class/class.entity';
import { Student } from './student/student.entity';
import { TeacherModule } from './teacher/teacher.module';
import { Teacher } from './teacher/teacher.entity';
import { BooksModule } from './books/books.module';
import { Book } from './books/book.entity';
import { BookModule } from './books/bookModule.entity';
import { BookSubmodule } from './books/bookSubmodule.entity';
import { Paragraph } from './books/paragraph.entity';
import { LessonsModule } from './lessons/lessons.module';
import { Lesson } from './lessons/entities/lesson.entity';
import { Subject } from './lessons/entities/subject.entity';
import { ClassSubjectTeacher } from './class/class-subject-teacher.entity';
import { ClassLesson } from './class/class-lesson.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'mydatabase',
      entities: [
        Class,
        Student,
        Teacher,
        Book,
        BookModule,
        BookSubmodule,
        Paragraph,
        Lesson,
        Subject,
        ClassSubjectTeacher,
        ClassLesson,
      ],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    StudentModule,
    ClassModule,
    TeacherModule,
    BooksModule,
    LessonsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
