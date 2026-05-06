import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { trimIfString } from 'src/common/utils/trim-if-string';

export class ContactDto {
  @ApiProperty({ example: 'Jonas', description: 'Sender name' })
  @Transform(trimIfString)
  @IsString({ message: 'VALIDATION_NAME_MUST_BE_STRING' })
  @IsNotEmpty({ message: 'VALIDATION_NAME_REQUIRED' })
  @MinLength(2, { message: 'VALIDATION_NAME_MIN_LENGTH' })
  @MaxLength(100, { message: 'VALIDATION_NAME_MAX_LENGTH' })
  name: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'Sender email' })
  @Transform(trimIfString)
  @IsString({ message: 'VALIDATION_EMAIL_MUST_BE_STRING' })
  @IsNotEmpty({ message: 'VALIDATION_EMAIL_REQUIRED' })
  @IsEmail({}, { message: 'VALIDATION_INVALID_EMAIL' })
  @MaxLength(254, { message: 'VALIDATION_EMAIL_MAX_LENGTH' })
  email: string;

  @ApiProperty({
    example: 'Hello, I have a question...',
    description: 'Contact message',
  })
  @Transform(trimIfString)
  @IsString({ message: 'VALIDATION_MESSAGE_MUST_BE_STRING' })
  @IsNotEmpty({ message: 'VALIDATION_MESSAGE_REQUIRED' })
  @MinLength(10, { message: 'VALIDATION_MESSAGE_MIN_LENGTH' })
  @MaxLength(1000, { message: 'VALIDATION_MESSAGE_MAX_LENGTH' })
  message: string;

  @ApiProperty({ description: 'Cloudflare Turnstile token' })
  @IsString({ message: 'VALIDATION_CAPTCHA_MUST_BE_STRING' })
  @IsNotEmpty({ message: 'VALIDATION_CAPTCHA_REQUIRED' })
  captchaToken: string;
}
