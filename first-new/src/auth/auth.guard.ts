import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    if (!req.headers.authorization) {
      console.log('You are not authorized to access this services');
      return false;
    } else {
      const token = req.headers.authorization;

      try {
        jwt.verify(token, process.env.SECRET_KEY);
        return true;
      } catch (error) {
        console.log('invalid token');
      }
    }
    return true;
  }
}
