# tienda-backend

Backend para una tienda/joyeria con autenticacion, usuarios y productos. Construido con NestJS, TypeScript y PostgreSQL.

## Que hace

- Autenticacion con tokens (access/refresh) y roles.
- Gestion de usuarios (solo SUPER_ADMIN).
- Gestion de productos con filtros por categoria, material, subcategoria y rango de precios.
- Carga de imagenes de producto y exposicion de archivos estaticos en `/uploads`.

## Tecnologias

- Node.js + TypeScript
- NestJS 11
- TypeORM + PostgreSQL
- class-validator + class-transformer
- bcrypt (hash de passwords)
- Multer (uploads)

## Estructura del proyecto

```
src/
  app.module.ts          # Modulo raiz, DB y guard global
  main.ts                # Bootstrap, CORS, validation pipe, static assets
  auth/                  # Login y perfil
  users/                 # CRUD de usuarios
  products/              # CRUD y filtros de productos + upload
  common/
    entities/            # Entidades TypeORM
    enums/               # Roles, categorias y materiales
    decorators/          # Public, Roles, GetUserId
    jwt/                 # Servicio JWT custom
    dto/                 # DTOs comunes
    000_datos_iniciales.sql
```

## Modulos principales

- `AuthModule`: login, lectura de perfil del usuario autenticado.
- `UsersModule`: CRUD de usuarios, acceso restringido a `SUPER_ADMIN`.
- `ProductsModule`: CRUD y filtros publicos, y acciones admin.
- `JwtAuthModule`: servicio JWT custom usado por el guard global.

## Seguridad y permisos

- Guard global en `AppModule` que valida el token `Bearer`.
- Decorador `@Public()` para endpoints abiertos.
- Decorador `@Roles(...)` para restringir por rol (`OWNER`, `SUPER_ADMIN`).

## Endpoints principales (resumen)

- `POST /auth/login` (public) login con usuario y password.
- `GET /auth/me` token requerido.
- `GET /products` (public) lista todos.
- `GET /products/:id` (public) detalle.
- `GET /products/category/:category` (public) filtro por categoria.
- `GET /products/material/:material` (public) filtro por material.
- `GET /products/subcategory/:subcategory` (public) filtro por subcategoria.
- `GET /products/price-range?min=...&max=...` (public) filtro por precio.
- `POST /products` (roles: OWNER, SUPER_ADMIN) crear.
- `PATCH /products/:id` (roles: OWNER, SUPER_ADMIN) actualizar.
- `DELETE /products/:id` (roles: OWNER, SUPER_ADMIN) eliminar.
- `POST /products/upload` (roles: OWNER, SUPER_ADMIN) subir imagen.
- `POST /users` (roles: SUPER_ADMIN) crear.
- `GET /users` (roles: SUPER_ADMIN) listar.
- `GET /users/:id` (roles: SUPER_ADMIN) detalle.
- `PATCH /users/:id` (roles: SUPER_ADMIN) actualizar.
- `DELETE /users/:id` (roles: SUPER_ADMIN) eliminar.

## Configuracion

La app carga variables desde `.env.db`.

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=admin
DB_DATABASE=joyeria_db
PORT=3000
```

TypeORM esta configurado con `synchronize: true` (autocrea tablas en desarrollo).

## Scripts utiles

```bash
npm install
npm run start
npm run start:dev
npm run build
npm run test
```

## Datos iniciales

`src/common/000_datos_iniciales.sql` contiene usuarios y productos de ejemplo.

## Notas

- Los uploads se guardan en `uploads/` y se sirven desde `/uploads/`.
- El JWT es custom (no usa librerias de JWT externas).
