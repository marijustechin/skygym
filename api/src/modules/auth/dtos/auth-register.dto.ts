import {
  IsString,
  MinLength,
  MaxLength,
  IsIn,
  IsNotEmpty,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { AuthLoginDto } from './auth-login.dto';
import { trimIfString } from 'src/common/utils/trim-if-string';

export class AuthRegisterDto extends AuthLoginDto {
  @ApiProperty({ example: 'Jonas', description: 'User name' })
  @Transform(trimIfString)
  @IsString({ message: 'VALIDATION_FIRST_NAME_MUST_BE_STRING' })
  @IsNotEmpty({ message: 'VALIDATION_FIRST_NAME_REQUIRED' })
  @MinLength(2, { message: 'VALIDATION_FIRST_NAME_MIN_LENGTH' })
  @MaxLength(30, { message: 'VALIDATION_FIRST_NAME_MAX_LENGTH' })
  @Matches(/^[\p{L}]+(?:['-][\p{L}]+)*$/u, {
    message: 'VALIDATION_FIRST_NAME_INVALID',
  })
  firstName: string;

  @ApiProperty({ example: 'lt', description: 'Language code' })
  @Transform(trimIfString)
  @IsString({ message: 'VALIDATION_LANGUAGE_MUST_BE_STRING' })
  @IsNotEmpty({ message: 'VALIDATION_LANGUAGE_REQUIRED' })
  @IsIn(['lt', 'en', 'ru'], { message: 'VALIDATION_INVALID_LANGUAGE' })
  lang: 'lt' | 'en' | 'ru';
}
