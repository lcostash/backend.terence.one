import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './module';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { environment } from './environment';
import { HttpExceptionFilter } from './filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: false,
    transform: true,
  }));
  app.enableCors({
    origin: environment.cors.origin,
    methods: 'GET,OPTIONS,POST,PUT,PATCH,DELETE',
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Content-Language', 'X-AUTH-TOKEN', 'Cache-Control', 'Pragma', 'Expires'],
    exposedHeaders: ['Link'],
    maxAge: 3600,
  });
  app.setGlobalPrefix('api');
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }));
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(environment.app.port || 3000);
}

bootstrap().then();
