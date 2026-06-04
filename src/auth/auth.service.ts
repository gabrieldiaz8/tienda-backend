import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '../common/jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.userService.validatePassword(
      loginAuthDto.usuario,
      loginAuthDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: user.id,
      usuario: user.usuario,
      name: user.name,
      role: user.role,
    };

    const tokenPair = this.jwtService.generateTokenPair(payload);

    return {
      accessToken: tokenPair.accessToken,
      refreshToken: tokenPair.refreshToken,
      role: user.role,
      user: this.userService.toPublicUser(user),
    };
  }

  async me(userId: number) {
    const user = await this.userService.findOneById(userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return this.userService.toPublicUser(user);
  }
}
