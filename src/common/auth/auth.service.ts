import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginService } from 'src/modules/login/login.service';



@Injectable()
export class AuthService {
  constructor(private readonly loginService: LoginService, private readonly jwtService: JwtService) {}

  async validate( username:string, password: string):Promise<any> {
    const user = await this.loginService.findUser(username)

    if( user?.password === password) {
      const { password,...userInfo} = user
      return userInfo
    }else {
      return null
    }
  }

  async login(user): Promise<any> {
    const { username, password} = user
    return {
       token: this.jwtService.sign({username, sub: password})
    }
  }
}
