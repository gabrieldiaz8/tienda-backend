import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'crypto';
import { jwtConstants } from './jwt.constants';
import { JwtPayload, TokenPair } from './interfaces/jwtPayload.interface';


@Injectable()
export class JwtService {
  config = {
    auth: {
      secret: jwtConstants.secretAuth,
      expiresIn: jwtConstants.authExpiresIn,
    },
    refresh: {
      secret: jwtConstants.secretRefresh,
      expiresIn: jwtConstants.refreshExpiresIn,
    },
  };

  private encode(value: string): string {
    return Buffer.from(value, 'utf8').toString('base64url');
  }

  private decode(value: string): string {
    return Buffer.from(value, 'base64url').toString('utf8');
  }

  private signContent(content: string, secret: string): string {
    return createHmac('sha256', secret).update(content).digest('base64url');
  }

  generateToken(
    payload: Omit<JwtPayload, 'iat' | 'exp'>, // Omitimos iat y exp porque los genera automáticamente el JwtService
    type: 'refresh' | 'auth' = 'auth', // Por defecto es 'auth' pero podemos especificar 'refresh'
    ): string {
    const now = Math.floor(Date.now() / 1000);
    const fullPayload: JwtPayload = {
        sub: payload.sub,
        email: payload.email,
        name: payload.name,
        role: payload.role,
        kind: type,
        iat: now,
        exp: now + this.config[type].expiresIn,
    };

    const encodedPayload = this.encode(JSON.stringify(fullPayload));
    const signature = this.signContent(encodedPayload, this.config[type].secret);
    return `${encodedPayload}.${signature}`;
  }

  refreshToken(refreshToken: string): TokenPair {
    try {
        const payload = this.verifyToken(refreshToken, 'refresh');

        const timeToExpire = (payload.exp ?? 0) - Math.floor(Date.now() / 1000);

        return {
        accessToken: this.generateToken({
          sub: payload.sub,
          email: payload.email,
          name: payload.name,
          role: payload.role,
        }),
        refreshToken:
            timeToExpire < 20 * 60  // Si le quedan menos de 20 minutos
            ? this.generateToken(  // Generamos nuevo refresh token
                {
                  sub: payload.sub,
                  email: payload.email,
                  name: payload.name,
                  role: payload.role,
                },
                'refresh',
                )
            : refreshToken,  // Sino, devolvemos el mismo
        };
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Refresh token expirado');
        }
        throw new UnauthorizedException('Refresh token inválido');
    }
  }

  generateTokenPair(payload: Omit<JwtPayload, 'iat' | 'exp'>): TokenPair {
    return {
        accessToken: this.generateToken(payload, 'auth'),
        refreshToken: this.generateToken(payload, 'refresh'),
    };
  }

  verifyToken(token: string, type: 'refresh' | 'auth' = 'auth'): JwtPayload {
    try {
      const [encodedPayload, signature] = token.split('.');
      if (!encodedPayload || !signature) {
        throw new UnauthorizedException('Token inválido o expirado');
      }

      const expectedSignature = this.signContent(encodedPayload, this.config[type].secret);
      const signatureBuffer = Buffer.from(signature, 'base64url');
      const expectedBuffer = Buffer.from(expectedSignature, 'base64url');
      if (signatureBuffer.length !== expectedBuffer.length || !timingSafeEqual(signatureBuffer, expectedBuffer)) {
        throw new UnauthorizedException('Token inválido o expirado');
      }

      const payload = JSON.parse(this.decode(encodedPayload)) as JwtPayload;

      if (payload.kind !== type) {
        throw new UnauthorizedException('Token inválido o expirado');
      }

      if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
        throw new UnauthorizedException('Token expirado');
      }

      return payload;
    } catch (error) {
        throw new UnauthorizedException('Token inválido o expirado');
    }
    }
}