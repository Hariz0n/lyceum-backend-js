import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './class.entity';

@Module({
  controllers: [ClassController],
  imports: [TypeOrmModule.forFeature([Class])],
})
export class ClassModule {}
