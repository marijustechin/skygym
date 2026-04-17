import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  Matches,
} from 'class-validator';
import { trimIfString } from 'src/common/utils/trim-if-string';

export class AuthLoginDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'User email' })
  @Transform(trimIfString)
  @IsString({ message: 'VALIDATION_EMAIL_MUST_BE_STRING' })
  @IsNotEmpty({ message: 'VALIDATION_EMAIL_REQUIRED' })
  @IsEmail({}, { message: 'VALIDATION_INVALID_EMAIL' })
  @MaxLength(254, { message: 'VALIDATION_EMAIL_MAX_LENGTH' })
  email: string;

  @ApiProperty({ example: 'Str0ng@pa55word', description: 'User password' })
  @IsString({ message: 'VALIDATION_PASSWORD_MUST_BE_STRING' })
  @IsNotEmpty({ message: 'VALIDATION_PASSWORD_REQUIRED' })
  @MinLength(8, { message: 'VALIDATION_PASSWORD_MIN_LENGTH' })
  @MaxLength(72, { message: 'VALIDATION_PASSWORD_MAX_LENGTH' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
    message: 'VALIDATION_PASSWORD_INVALID',
  })
  password: string;
}
