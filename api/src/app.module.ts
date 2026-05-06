import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { appConfig } from './config/configuration';
import { envValidationSchema } from './config/env.validation';
import { AuthModule } from './modules/auth/auth.module';
import { ContactModule } from './modules/contact/contact.module';
import { UsersModule } from './modules/users/users.module';
import { MailModule } from './common/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [appConfig],
      validationSchema: envValidationSchema,
      validationOptions: {
        abortEarly: false,
        allowUnknown: true,
      },
    }),

    ThrottlerModule.forRoot([{ ttl: 600_000, limit: 3 }]),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isProd = config.getOrThrow('env') === 'production';

        return {
          type: 'mysql',
          host: config.getOrThrow<string>('db.host'),
          port: config.getOrThrow<number>('db.port'),
          username: config.getOrThrow<string>('db.user'),
          password: config.getOrThrow<string>('db.pass'),
          database: config.getOrThrow<string>('db.name'),

          autoLoadEntities: true,
          synchronize: config.getOrThrow<boolean>('db.sync'),
          migrationsRun: false,
          logging: !isProd,
        };
      },
    }),

    AuthModule,
    ContactModule,
    UsersModule,
    MailModule,
  ],
})
export class AppModule {}
