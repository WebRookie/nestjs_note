import { LoginService } from './login.service';
import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { loginSchema, registSchema } from 'src/common/validators/login.schema';
import { LoginValidationPipe } from 'src/pipes/validation.pipe'
import { CreateUserDto } from './login.dto';

@Controller('api')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }
  @Post('login')
  @UsePipes(new LoginValidationPipe(loginSchema))
  async login(@Body() req: object) {
    try {
      return this.loginService.loginHandler(req)
    } catch (error) {
      console.log(error)
    }
  }

  @Post('regist')
  @UsePipes(new LoginValidationPipe(registSchema))
  async regist(@Body() req: CreateUserDto) {
    try {
      return this.loginService.registUser(req)
    } catch (error) {
      console.log(error)
    }
  }
}
