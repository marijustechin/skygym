import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'User email' })
  @IsEmail({}, { message: 'VALIDATION_INVALID_EMAIL' })
  @MaxLength(320, { message: 'VALIDATION_EMAIL_MAX_LENGHT' })
  email: string;

  @ApiProperty({ example: 'Str0ng@pa55word', description: 'User password' })
  @IsString()
  @MinLength(8, { message: 'VALIDATION_PASSWORD_MIN_LENGHT' })
  @MaxLength(72, { message: 'VALIDATION_PASSWORD_MAX_LENGHT' })
  password: string;
}
