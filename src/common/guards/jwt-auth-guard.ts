import { jwtConstant } from 'src/common/auth/constants';
import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector){
    super()
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const skipAuth = this.reflector.getAllAndOverride<boolean>(jwtConstant.publicSecret, [
      context.getHandler(),
      context.getClass()
    ])
    if(skipAuth) {
      return true
    }
    return super.canActivate(context)
  }

  handleRequest<TUser = any>(err: any, user: any, info: any, context: any, status?: any): TUser {
    console.log(info)  
    if (user && !err && !info) return user
    else throw err || new UnauthorizedException()
  }
}