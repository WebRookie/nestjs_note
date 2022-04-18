import { LoginService } from './login.service';
import { Controller, Post, Body, UsePipes, UseGuards } from '@nestjs/common';
import { loginSchema, registSchema } from 'src/common/validators/login.schema';
import { CommonValidationPipe } from 'src/pipes/validation.pipe'
import { CreateUserDto } from './login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }
  @Post('login')
  @UsePipes(new CommonValidationPipe(loginSchema))
  @UseGuards(AuthGuard('local'))
  async login(@Body() req: object) {
    try {
      return this.loginService.loginHandler(req)
    } catch (error) {
      console.log(error)
    }
  }

  @Post('regist')
  @UsePipes(new CommonValidationPipe(registSchema))
  async regist(@Body() req: CreateUserDto) {
    try {
      return this.loginService.registUser(req)
    } catch (error) {
      console.log(error)
    }
  }
}
