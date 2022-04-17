import { Role } from './../enum/role.enum';
import { ROLES_KEY } from './../decorators/role.decorator';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';


/**
 * CanActive
 * Interface defining the canActivate() function that must be implemented by a guard. 
 * Return value indicates whether or not the current request is allowed to proceed. 
 * Return can be either synchronous (boolean) or asynchronous (Promise or Observable)
 */

/**
 * Reflector
 * Helper class providing Nest reflection capabilities.
 */

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector){}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role []>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    console.log('this is requiredRoles', requiredRoles)
    if(!requiredRoles) {
      return true
    }
    const { user } = context.switchToHttp().getRequest()
    return requiredRoles.some(role => user.roles?.include(role))
  }
}