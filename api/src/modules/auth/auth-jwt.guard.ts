import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ActiveUserData } from './interfaces/active-user-data.interface';

@Injectable()
export class AuthJwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('USER_UNAUTHORISED');
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('USER_UNAUTHORISED');
    }

    try {
      const payload: ActiveUserData = await this.jwtService.verifyAsync(token);

      req['user'] = payload;

      return true;
    } catch (error) {
      throw new UnauthorizedException('USER_UNAUTHORISED', {
        cause: error,
      });
    }
  }
}
