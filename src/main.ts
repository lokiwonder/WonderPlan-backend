import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AZURE_SERVER_NEST_PORT } from './_commons/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // description: cors 설정 //
  app.enableCors();
  await app.listen(AZURE_SERVER_NEST_PORT);
}
bootstrap();
