import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { JwtPayload } from "src/common/jwt/interfaces/jwtPayload.interface";
import { JwtService } from "src/common/jwt/jwt.service";
import { UsersService } from "src/users/users.service";
import { ROLES_KEY } from "src/common/decorators/permission.decorator";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private jwtService: JwtService,
        private userService: UsersService,
        private reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
        context.getHandler(),
        context.getClass(),
        ]);
        if (isPublic) return true;

        try {
            const request = context.switchToHttp().getRequest();
            const token = this.extractTokenFromHeader(request);
            if (!token) throw new UnauthorizedException('El token no existe')

            const payload = await this.jwtService.verifyToken(token);

            const user = this.userService.findUserByEmailOrNull(payload.email);

            if (!user) {
                throw new UnauthorizedException('Usuario no encontrado');
            }

            if (user.id !== payload.sub) {
                throw new UnauthorizedException('Token inválido - ID no coincide');
            }

            if (user.role !== payload.role) {
                throw new UnauthorizedException('Token inválido - Rol modificado');
            }

            request.user = {
                sub: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            } as JwtPayload;

            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);

            if (!requiredRoles?.length) return true;

            if (!requiredRoles.includes(user.role)) {
                throw new ForbiddenException('No tienes los permisos necesarios');
            }

            return true;
        } catch (error) {
            if (error instanceof UnauthorizedException || 
                error instanceof ForbiddenException) {
                throw error;
            }
            // Errores inesperados
            throw new UnauthorizedException('Token inválido o error del servidor');
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
  }
}

