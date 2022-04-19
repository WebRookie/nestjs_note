import { LoginService } from 'src/modules/login/login.service';
// import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, IStrategyOptions } from "passport-local";
import { ContextIdFactory, ModuleRef } from '@nestjs/core';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private loginService: LoginService, private moduleRef: ModuleRef) {
    // super({
    //   usernameField: 'username',
    //   passwordField: 'password'

    // } as IStrategyOptions)
    super({
      passReqToCallback: true
    })
  }

  // validate 是local Strategy的内置方法  现在是属于自定义validate方法
  async validate(request: Request, username: string, password: string): Promise<any> {
    // // 查询数据库资料
    // //  const user = await this.loginService.validate(username, password)
    // const contextId = ContextIdFactory.getByRequest(request)
    // this.loginService = await this.moduleRef.resolve(LoginService, contextId)
    // const user = await this.loginService.validate(username, password)
    // if (user) return user
    // else throw new UnauthorizedException('Access Deny')
    console.log(username)
    console.log(password)
  }
}