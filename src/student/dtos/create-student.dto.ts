import { IsEmail, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString({ always: true }) firstName: string;
  @IsString({ always: true }) lastName: string;
  @IsString({ always: false }) middleName?: string;
  @IsEmail() email: string;
  @IsString({ always: true }) passwordHash: string;
}
