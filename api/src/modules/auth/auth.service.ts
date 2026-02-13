import { ConflictException, Injectable } from '@nestjs/common';
import { AuthRegisterDto } from './dtos/auth-register.dto';
import { UsersService } from '../users/users.service';
import { PasswordService } from '../../common/security/password.service';

import { createHash, randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly passwordService: PasswordService,
  ) {}

  async register(dto: AuthRegisterDto) {
    const email = dto.email.toLowerCase().trim();
    const firstName = dto.firstName.trim();

    const existingUser = await this.userService.findByEmail(email);

    if (existingUser) throw new ConflictException('Email already in use');

    const passwordHash = await this.passwordService.hashPassword(dto.password);

    const verificationTokenRaw = randomBytes(32).toString('hex');
    const verificationTokenHash = createHash('sha256')
      .update(verificationTokenRaw)
      .digest('hex');

    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h
    // 4) save user

    const user = await this.userService.create({
      email,
      firstName,
      passwordHash,
      verificationToken: verificationTokenHash,
      verificationExpires,
      isEmailVerified: false,
    });

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      isEmailVerified: user.isEmailVerified,
      // DEV ONLY:
      verificationToken: verificationTokenRaw,
    };
  }
}
