import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    // super({
    //   usernameField: 'username',
    //   passwordField: 'password'
    // } as IStrategyOptions)
    super()
  }

  // validate 是local Strategy的内置方法  
  async validator(username: string, password: string): Promise<any> {
    // 查询数据库资料
   const user = await this.authService.validate(username, password)
   if(user) return user
   else throw new UnauthorizedException('Access Denied')
  }
}