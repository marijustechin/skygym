import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { envValidationSchema } from './config/env.validation';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [configuration],
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
          synchronize: false,
          migrationsRun: false,
          logging: !isProd,
        };
      },
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
