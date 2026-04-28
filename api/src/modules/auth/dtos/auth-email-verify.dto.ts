import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class AuthEmailVerifyDto {
  @ApiProperty({
    example: 'd3b484ec68a2d61d6a909062f77d148f0e65fd199ff24444c0649a961e06530a',
    description: 'Email verification token',
  })
  @IsString({ message: 'EMAIL_VERIFICATION_TOKEN_MUST_BE_STRING' })
  @IsNotEmpty({ message: 'EMAIL_VERIFICATION_TOKEN_REQUIRED' })
  @Matches(/^[a-f0-9]{64}$/i, { message: 'EMAIL_VERIFICATION_TOKEN_INVALID' })
  verificationTokenRaw: string;
}
