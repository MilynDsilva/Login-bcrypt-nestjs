import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { RequestUserDto } from './guard.dto';

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
        const result = jwt.verify(tokenDecodeable, process.env.TOKEN_SECRET,function(err, decoded) {
            if(err)
                return false;
            else {
              request.user = new RequestUserDto(
                decoded['id'],
                decoded['email'],
                decoded['iat'],
                decoded['exp'],
              );
              return true;
            }
          });
        return result;
    }
}
