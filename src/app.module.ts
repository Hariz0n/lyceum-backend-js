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
      ],
      synchronize: true,
    }),
    AuthModule,
    StudentModule,
    ClassModule,
    TeacherModule,
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
