import { IsEmail, IsEnum, IsString, IsStrongPassword } from 'class-validator';

export class RegisterDto {
  @IsString() firstName: string;
  @IsString() lastName: string;
  @IsString()
  middleName?: string;
  @IsEmail() email: string;
  @IsStrongPassword() password: string;
  @IsEnum(['student', 'teacher']) type: 'student' | 'teacher';
}
