import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AuthLoginDto } from './auth-login.dto';

export class AuthRegisterDto extends AuthLoginDto {
  @ApiProperty({ example: 'Jonas', description: 'User name' })
  @IsString()
  @MinLength(2, { message: 'VALIDATION_FIRST_NAME_MIN_LENGHT' })
  @MaxLength(100, { message: 'VALIDATION_FIRST_NAME_MAX_LENGHT' })
  firstName: string;

  @ApiProperty({ example: 'en', description: 'User language code' })
  @IsString()
  @MinLength(2)
  @MaxLength(2)
  langCode: string;
}
