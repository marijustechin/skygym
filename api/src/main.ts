import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './config/swagger.config';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import fastifyCookie from '@fastify/cookie';
import { type AppConfig } from './config/configuration';
import { GlobalExceptionFilter } from './common/api/filters/global-exception.filter';

declare global {
  var PhusionPassenger:
    | {
        configure: (options: { autoInstall: boolean }) => void;
      }
    | undefined;
}

const isPassenger = typeof PhusionPassenger !== 'undefined';

// prevents the "called more than once" error
if (isPassenger) {
  PhusionPassenger!.configure({ autoInstall: false });
}

async function start() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await app.register(fastifyCookie);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // išmeta extra fields
      forbidNonWhitelisted: true, // meta klaidą jei atsiuntė papildomą
      transform: true, // pavers types (pvz. string->number jei reikia)
      exceptionFactory: (validationErrors) => {
        const details = [
          ...new Set(
            validationErrors.flatMap((error) =>
              Object.values(error.constraints ?? {}).map((message) => {
                if (message === `property ${error.property} should not exist`) {
                  return 'VALIDATION_FORBIDDEN_FIELD';
                }

                return message;
              }),
            ),
          ),
        ];

        return new BadRequestException({
          success: false,
          code: 'VALIDATION_FAILED',
          details,
        });
      },
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter());

  app.setGlobalPrefix('v1');

  const config = app.get<ConfigService<AppConfig>>(ConfigService);

  const corsConfig = config.getOrThrow<AppConfig['cors']>('cors');
  const origins = corsConfig.origins;
  app.enableCors({
    origin: origins,
    credentials: true,
  });

  const swaggerConfig = config.getOrThrow<AppConfig['swagger']>('swagger');
  const swaggerEnabled = swaggerConfig.enabled;

  if (swaggerEnabled) {
    setupSwagger(app);
  }

  const port = config.get<number>('port') ?? 3003;
  const env = config.get<string>('env');

  if (isPassenger) {
    await app.init(); // sets up NestJS modules/routes
    const fastify = app.getHttpAdapter().getInstance();
    await fastify.ready(); // triggers Fastify's boot phase, populating all lifecycle hooks on route contexts
    fastify.server.listen('passenger'); // registers the server with Passenger via raw http.Server.listen()
  } else {
    await app.listen(port);
  }

  console.log(`API server started on port ${port}\nNodeEnv: ${env}`);
}

void start();
