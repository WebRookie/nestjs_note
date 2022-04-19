import { UnauthorizedException } from '@nestjs/common';
import { LoginService } from 'src/modules/login/login.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstant } from './constants';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly loginService: LoginService) {
    super({
      // jwtFromRequest: ExtractJwt.fromHeader('Access_Token'), // 获取header中的Access_Token
      jwtFromRequest: ExtractJwt.fromHeader('token'), // 获取header中的Access_Token  ?? 只能使用token这个单词？
      ignoreExpiration: false, // 不忽略到期时间
      secretOrKey: jwtConstant.secret
    })
  }


  
  async validate(payload: any) {
    // 扯了半天的犊子，才发现。不需要再验证一遍了。这个策略已经验证过了。只是返回payload看需要进行身份操作
    //   console.log(payload)
    //   const data = this.loginService.validateAuthData(payload)
    //   if(data) return data
    //   else throw new UnauthorizedException
    // 扯犊子over----
    if (payload) {
      return payload.username
    }
  }
}