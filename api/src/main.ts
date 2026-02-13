import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './config/swagger.config';
import { ValidationPipe } from '@nestjs/common';

async function start() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // išmeta extra fields
      forbidNonWhitelisted: true, // meta klaidą jei atsiuntė extra
      transform: true, // pavers types (pvz. string->number jei reikia)
    }),
  );

  app.setGlobalPrefix('api/v1');

  const config = app.get(ConfigService);

  const origins = config.get<string[]>('cors.origins') ?? [];
  if (origins.length) {
    app.enableCors({
      origin: origins,
      credentials: true,
    });
  }

  const env = config.get<string>('env') ?? 'development';
  const swaggerEnabled =
    config.get<boolean>('swagger.enabled') ?? env !== 'production';

  if (swaggerEnabled) {
    setupSwagger(app);
  }

  const port = config.get<number>('port') ?? 3003;
  await app.listen(port);

  console.log(`API server started on port ${port}`);
}

void start();
