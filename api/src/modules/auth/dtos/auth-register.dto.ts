import { IsString, MinLength, MaxLength, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AuthLoginDto } from './auth-login.dto';

export class AuthRegisterDto extends AuthLoginDto {
  @ApiProperty({ example: 'Jonas', description: 'User name' })
  @IsString()
  @MinLength(2, { message: 'VALIDATION_FIRST_NAME_MIN_LENGHT' })
  @MaxLength(50, { message: 'VALIDATION_FIRST_NAME_MAX_LENGHT' })
  firstName: string;

  @ApiProperty({ example: 'lt', description: 'Language code' })
  @IsIn(['lt', 'en', 'ru'])
  lang: 'lt' | 'en' | 'ru';
}
