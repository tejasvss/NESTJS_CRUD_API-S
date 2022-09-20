import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

require("dotenv").config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    transformOptions: {
      enableImplicitConversion: true // allow conversion underneath
    }
  }));
  await app.listen(9001);
}
bootstrap();
