import { LoginService } from 'src/modules/login/login.service';
// import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, IStrategyOptions } from "passport-local";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly loginService: LoginService) {
    super({
      usernameField: 'username',
      passwordField: 'password'
    } as IStrategyOptions)
    // super()
  }

  // validate 是local Strategy的内置方法  
  async validate(username: string, password: string): Promise<any> {
    // 查询数据库资料
   const user = await this.loginService.validate(username, password)
   if(user) return user
   else throw new UnauthorizedException('Access Deny')
  }
}