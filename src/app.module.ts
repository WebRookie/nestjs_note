import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService} from './app.service';
import { LoginModule } from './modules/login/login.module';
import { BlogModule } from './modules/blog/blog.module';
// import { AuthModule } from './common/auth/auth.module';

@Module({
  imports: [LoginModule, BlogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
