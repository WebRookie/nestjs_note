import { HttpExceptionFilter } from './common/filters/error.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 引用程序的启动
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(3000);
}
bootstrap();
