import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './class.entity';
import { ClassService } from './class.service';

@Module({
  controllers: [ClassController],
  imports: [TypeOrmModule.forFeature([Class])],
  providers: [ClassService],
})
export class ClassModule {}
