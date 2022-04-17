import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { Module } from "@nestjs/common";




@Module({
  providers:[LoginService],
  controllers: [LoginController],
  exports: [LoginService]
})


export class LoginModule {}
