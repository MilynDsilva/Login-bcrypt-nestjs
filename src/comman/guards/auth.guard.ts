import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ):any {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}

function validateRequest(request: any) {
    const token = request.headers['authorization'];
    if(token){
        const tokenDecodeable = token.split(' ')[1]
        const result = jwt.verify(tokenDecodeable, process.env.TOKEN_SECRET,function(err, decode) {
            if(err)
                return false;
            else 
                return true;
          });
        return result;
    }
}
