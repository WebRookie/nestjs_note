import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 引用程序的启动
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
