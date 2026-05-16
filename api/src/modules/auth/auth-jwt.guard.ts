import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import type { FastifyRequest } from 'fastify';
import { ActiveUserData } from './interfaces/active-user-data.interface';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';

@Injectable()
export class AuthJwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest<FastifyRequest>();
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
