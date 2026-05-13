import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthRegisterDto } from './dtos/auth-register.dto';
import { User } from '../users/entities/user.entity';
import { AuthLoginDto } from './dtos/auth-login.dto';
import { AuthEmailVerifyDto } from './dtos/auth-email-verify.dto';
import type { FastifyReply, FastifyRequest } from 'fastify';

interface CookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'strict' | 'lax' | 'none';
  path: string;
  maxAge: number;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private get cookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/', // all API routes
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
  }

  //
  // registration
  //
  @ApiOperation({
    summary: 'New user registration with name, email and password',
  })
  @ApiConflictResponse({
    description: 'Email already in use',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        code: { type: 'string', example: 'USER_REGISTRATION_EMAIL_IN_USE' },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Validation failed',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        code: { type: 'string', example: 'VALIDATION_FAILED' },
        details: {
          type: 'array',
          items: { type: 'string' },
          example: [
            'VALIDATION_INVALID_EMAIL',
            'VALIDATION_PASSWORD_MIN_LENGTH',
          ],
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User has been created and verification email has been sent',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        code: { type: 'string', example: 'USER_REGISTRATION_SUCCESSFUL' },
      },
    },
  })
  @HttpCode(201)
  @Post('register')
  register(@Body() dto: AuthRegisterDto) {
    return this.authService.register(dto);
  }

  //
  // login
  //
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(200)
  @Post('login')
  async login(
    @Body() dto: AuthLoginDto,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const tokens = await this.authService.login(dto);

    res.setCookie('refreshToken', tokens.refreshToken, this.cookieOptions);

    return {
      message: 'LOGIN_SUCCESSFUL',
      accessToken: tokens.accessToken,
    };
  }

  // verify email
  @ApiOperation({ summary: 'Verify user email address' })
  @ApiResponse({
    status: 200,
    description: 'Email verified successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'EMAIL_VERIFICATION_SUCCESSFUL' },
      },
    },
  })
  @Post('verify-email')
  verifyEmail(@Body() dto: AuthEmailVerifyDto) {
    return this.authService.verifyEmail(dto);
  }

  //
  // refresh access token
  //
  @Post('refresh')
  refresh(
    @Req() req: FastifyRequest,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const refreshToken = req.cookies['refreshToken'];

    if (!refreshToken) {
      res.clearCookie('refreshToken', this.cookieOptions);
      throw new UnauthorizedException();
    }

    // const tokens = await this.authService.refresh(refreshToken);

    // if (!tokens) {
    //   res.clearCookie('refreshToken', {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === 'production',
    //     sameSite: 'strict',
    //   });
    //   throw new UnauthorizedException();
    // }

    //res.cookie('refreshToken', userData.refreshToken, this.cookieOptions);

    return 'ka grazinam? message success?';
  }

  //
  // reset password
  //
  @Post('reset')
  reset() {}
}
