import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

export const GetUserId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): number => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user;

    if (!user || !user.sub) {
      throw new UnauthorizedException('Usuario no autenticado');
    }

    return Number(user.sub);
  },
);
