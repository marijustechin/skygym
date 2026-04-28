import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRegisterDto } from './dtos/auth-register.dto';
import { UsersService } from '../users/users.service';
import { PasswordService } from '../../common/security/password.service';
import { createHash, randomBytes } from 'crypto';
import { AuthLoginDto } from './dtos/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthEmailVerifyDto } from './dtos/auth-email-verify.dto';
import { MailService } from 'src/common/mail/mail.service';
import { ActiveUserData } from './interfaces/active-user-data.interface';
import { ConfigService } from '@nestjs/config';
import { StringValue } from 'ms';
import { User } from '../users/entities/user.entity';
import { UserRegistrationEmailInUseException } from './exceptions/user-registration-email-in-use.exception';
import { ApiSuccessResponse } from 'src/common/api/types/api-response.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  private async generateTokens(user: User) {
    const payload: ActiveUserData = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),

      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('jwt.refreshSecret'),
        expiresIn: this.configService.get<StringValue>('jwt.refreshExpiresIn'),
      }),
    ]);

    const refreshTokenHash =
      await this.passwordService.hashPassword(refreshToken);

    await this.userService.update(user.id, {
      refreshTokenHash: refreshTokenHash,
      lastLogin: new Date(),
    });

    return { accessToken, refreshToken };
  }

  private validateUser() {}

  /**
   *
   * @param dto: {firstName, email, password}
   * @returns
   */
  async register(dto: AuthRegisterDto): Promise<ApiSuccessResponse> {
    const email = dto.email.toLowerCase().trim();
    const firstName = dto.firstName.trim();

    const existingUser = await this.userService.findByEmail(email);

    if (existingUser) throw new UserRegistrationEmailInUseException();

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

    try {
      await this.mailService.sendVerificationEmail(
        user.email,
        user.firstName,
        verificationTokenRaw,
        dto.lang,
      );
    } catch (error) {
      console.error('Nepavyko išsiųsti laiško:', error);
    }

    return {
      success: true,
      code: 'USER_REGISTRATION_SUCCESSFUL',
    };
  }

  /**
   *
   * @param dto
   * @returns
   */
  async login(dto: AuthLoginDto) {
    const existingUser = await this.userService.getUserForLogin(dto.email);

    if (!existingUser)
      throw new UnauthorizedException('Incorect password or user email');

    if (!existingUser.isEmailVerified) {
      console.log(
        'Nepatvirtintas el. pasto adresas. Reikia pakartotinai siusti el. pasto patvirtiniom nuoroda?',
      );
    }

    if (!existingUser.passwordHash)
      throw new HttpException(
        'Uzsiregistravo su google - nera slaptazodzio',
        HttpStatus.BAD_REQUEST,
      );

    const password = await this.passwordService.verifyPassword(
      dto.password,
      existingUser.passwordHash,
    );

    if (!password)
      throw new UnauthorizedException('Incorect password or user email');

    return await this.generateTokens(existingUser);
  }

  /**
   *
   * @param dto verificationTokenRaw: string
   * @returns
   */
  async verifyEmail(dto: AuthEmailVerifyDto) {
    const verificationTokenHash = createHash('sha256')
      .update(dto.verificationTokenRaw)
      .digest('hex');

    const user = await this.userService.getUserByVerificationToken(
      verificationTokenHash,
    );

    if (!user)
      throw new BadRequestException('EMAIL_VERIFICATION_TOKEN_NOT_EXISTS');

    if (user.verificationExpires && new Date() > user.verificationExpires)
      throw new BadRequestException('EMAIL_VERIFICATION_TOKEN_EXPIRED');

    await this.userService.update(user.id, {
      isEmailVerified: true,
      verificationToken: null,
      verificationExpires: null,
    });

    return { success: true, code: 'EMAIL_VERIFICATION_SUCCESSFUL' };
  }

  async refresh(refreshToken: string) {
    const userData: ActiveUserData = await this.jwtService.verifyAsync(
      refreshToken,
      {
        secret: this.configService.get<string>('jwt.refreshSecret'),
      },
    );

    console.log(userData);
  }

  reset() {}
}
