import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { AppModule } from './app.module';

config();

const Mode = 'log';
async function start() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, {logger: [Mode]});
  app.listen(PORT);
}

start();
