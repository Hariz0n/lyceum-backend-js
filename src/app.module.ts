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
import { Subject } from './subjects/entities/subject.entity';
import { ClassSubjectTeacher } from './class/class-subject-teacher.entity';
import { ClassLesson } from './class/class-lesson.entity';
import { ConfigModule } from '@nestjs/config';
import { SubjectsModule } from './subjects/subjects.module';
import { HelpRequestModule } from './help-request/help-request.module';
import { HelpRequest } from './help-request/entities/help-request.entity';
import { SolvedHelpRequest } from './help-request/entities/solved-help-request.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '}{vrPMxDsZY3JwUd',
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
        HelpRequest,
        SolvedHelpRequest,
      ],
      synchronize: false,
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
    SubjectsModule,
    HelpRequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
