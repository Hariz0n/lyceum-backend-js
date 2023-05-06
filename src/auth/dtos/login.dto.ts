import { IsEmail, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @ApiProperty({
    description: 'Почта пользователя',
    nullable: false,
    default: 'test@test.ru',
  })
  email: string;
  @IsString()
  @ApiProperty({
    description: 'Пароль',
    nullable: false,
    default: 'Securepass',
  })
  password: string;
  @IsEnum(['student', 'teacher'])
  @ApiProperty({
    description: 'Пароль',
    nullable: false,
    type: ['student', 'teacher'],
    default: 'student',
  })
  type: 'student' | 'teacher';
}
