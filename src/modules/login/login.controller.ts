import { LoginService } from './login.service';
import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { loginSchema, registSchema } from 'src/common/validators/login.schema';
import { LoginValidationPipe } from 'src/pipes/validation.pipe'
import { CreateUserDto } from './login.dto';

@Controller('api')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post('login')
  @UsePipes(new LoginValidationPipe(loginSchema))
  async login(@Body() req: object) {
    try {
      console.log('请求体Start')
      console.log(req)
      console.log('请求体End')
    } catch (error) {
      console.log(error)
    }
  }

  @Post('regist')
  @UsePipes(new LoginValidationPipe(registSchema))
  async regist(@Body() req: CreateUserDto ) {
    try {
      console.log(req)
      this.loginService.registUser(req)
    } catch (error) {
      
    }
  }
}
