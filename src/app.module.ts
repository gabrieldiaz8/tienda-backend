import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { JwtAuthModule } from './common/jwt/jwt.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './common/entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',    // Al estar en Docker pero tú fuera, usas localhost
      port: 5432,
      username: 'postgres',
      password: 'postgres',    // La que pusiste en el comando de Docker
      database: 'joyeria_db',
      autoLoadEntities: true, // Esto carga automáticamente tus entidades de productos y usuarios
      synchronize: true,      // Sincroniza las tablas automáticamente (solo para desarrollo)
      entities: entities,
    }),
    AuthModule, JwtAuthModule, UsersModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
