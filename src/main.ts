import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as volleyball from 'volleyball';
import { HttpServerConfiguration } from '@thp/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import expressRateLimit from 'express-rate-limit';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const config = configService.get<HttpServerConfiguration>('server');
  const { host, port, rateLimit } = config;

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableVersioning();
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Express Middlewares
  app.use(volleyball);
  app.use(cookieParser());
  app.use(helmet());
  app.use(
    expressRateLimit({
      windowMs: rateLimit.rateInterval,
      max: rateLimit.rateMaxRequest,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  const documentBuilder = new DocumentBuilder()
    .setTitle('Healthy')
    .setDescription('API Reference')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('docs', app, document);

  app.listen(port, host, () => {
    Logger.log(`Server ready on http://${host}:${port}`, 'Application');
  });
}

bootstrap();
