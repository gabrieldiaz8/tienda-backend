import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from 'src/common/jwt/jwt.service';

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ){}

    login(loginAuthDto: LoginAuthDto){
        const user = this.userService.findUserByEmailOrNull(loginAuthDto.email);
        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const isPasswordValid = this.userService.validatePassword(user.email, loginAuthDto.password);
        if(!isPasswordValid){
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const payload = {
            sub: user.id,
            email: user.email, 
            name: user.name,
            role: user.role
        };

        const tokenPair = this.jwtService.generateTokenPair(payload);

        return {
            accessToken: tokenPair.accessToken,
            refreshToken: tokenPair.refreshToken,
            role: user.role,
            user: this.userService.toPublicUser(user),
        };

    }

    me(userId: number) {
        const user = this.userService.findOneById(userId);
        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }

        return this.userService.toPublicUser(user);
    }

}    
