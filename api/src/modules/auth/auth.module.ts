import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthJwtGuard } from './auth-jwt.guard';
import { UsersModule } from '../users/users.module';
import { SecurityModule } from '../../common/security/security.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { StringValue } from 'ms';
import { MailModule } from 'src/common/mail/mail.module';

@Module({
  imports: [
    UsersModule,
    SecurityModule,
    MailModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.accessSecret'),
        signOptions: {
          expiresIn: configService.get<StringValue>('jwt.accessExpiresIn'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthJwtGuard,
    },
  ],
})
export class AuthModule {}
