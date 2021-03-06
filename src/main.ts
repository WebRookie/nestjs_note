import { HttpExceptionFilter } from './common/filters/error.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

// 引用程序的启动
async function bootstrap() {
  // 关闭默认的日志打印
  const app = await NestFactory.create(AppModule);
  // const nestWinston = app.get(WINSTON_MODULE_NEST_PROVIDER)
  // app.useLogger(nestWinston)
  app.enableCors()
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(3000);
}
bootstrap();
