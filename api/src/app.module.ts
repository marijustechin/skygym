import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig } from './config/configuration';
import { envValidationSchema } from './config/env.validation';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MailModule } from './common/mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

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

    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.getOrThrow<string>('mail.host'),
          port: config.getOrThrow<number>('mail.port'),
          secure: false, // dar neissiaiskinau...
          auth: {
            user: config.getOrThrow<string>('mail.user'),
            pass: config.getOrThrow<string>('mail.pass'),
          },
        },
        defaults: {
          from: '"SkyGym" <info@skygym.lt>',
        },
        template: {
          dir: join(__dirname, 'common', 'mail', 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),

    AuthModule,
    UsersModule,
    MailModule,
  ],
})
export class AppModule {}
