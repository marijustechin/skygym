import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './modules/config/swagger.config';

async function start() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  const config = app.get(ConfigService);
  const port = config.get<number>('port') || 3003;

  setupSwagger(app);

  await app.listen(port, () =>
    console.log(`API server started on port ${port}`),
  );
}

void start();
