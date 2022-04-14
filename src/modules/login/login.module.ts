import { LoginController } from './login.controller';
import { Module } from "@nestjs/common";




@Module({
  controllers: [LoginController]
})


export class LoginModule {}
