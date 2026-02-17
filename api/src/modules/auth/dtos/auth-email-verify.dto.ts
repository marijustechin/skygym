import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class AuthEmailVerifyDto {
  @ApiProperty({
    example: 'd3b484ec68a2d61d6a909062f77d148f0e65fd199ff24444c0649a961e06530a',
    description: 'Email verification token',
  })
  @IsString()
  @MinLength(64)
  @MaxLength(64)
  verificationTokenRaw: string;
}
