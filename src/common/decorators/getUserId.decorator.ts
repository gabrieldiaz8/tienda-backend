import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const GetUserId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): number => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    
    if (!user || !user.sub) {
      throw new UnauthorizedException('Usuario no autenticado');
    }
    
    return Number(user.sub);
  },
);