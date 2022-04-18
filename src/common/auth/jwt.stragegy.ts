import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('Access_Token'), // 获取header中的Access_Token
      ignoreExpiration: false,
      secretOrKey: 'TestNestJwt'
    } as StreamPipeOptions)
  }

  async validate(payload: any) {
    console.log(payload)
    return { username: payload.username }
  }
}