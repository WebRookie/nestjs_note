import { LocalAuthGuard } from './../../common/guards/local.auth.guard';
import { LoginService } from './login.service';
import { Controller, Post, Body, UsePipes, UseGuards } from '@nestjs/common';
import { loginSchema, registSchema } from 'src/common/validators/login.schema';
import { LoginValidationPipe } from 'src/pipes/validation.pipe'
import { CreateUserDto } from './login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }
  // @UseGuards(LocalAuthGuard)
  @Post('login')
  @UsePipes(new LoginValidationPipe(loginSchema))
  @UseGuards(AuthGuard('local'))
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
