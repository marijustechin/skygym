import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class AuthRegisterDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  firstName: string;

  @IsEmail()
  @MaxLength(320)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password: string;
}
