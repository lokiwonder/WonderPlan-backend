import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // description: cors 설정 //
  app.enableCors();
  // todo: PORT 번호 config 혹은 환경변수로 변경 //
  await app.listen(4000);
}
bootstrap();
