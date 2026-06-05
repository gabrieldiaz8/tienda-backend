# tienda-backend — Contexto para OpenCode

## Qué es este proyecto

Backend de una tienda/joyería construido con NestJS 11, TypeScript y PostgreSQL vía TypeORM.
El proyecto está en etapa de mantenimiento y crecimiento incremental: los módulos principales
están completos y el foco actual es refactorizar, agregar endpoints puntuales y escribir tests.

## Stack y versiones

- Node.js + TypeScript strict
- NestJS 11
- TypeORM + PostgreSQL (`synchronize: true` solo en desarrollo)
- class-validator + class-transformer para validación de DTOs
- bcrypt para hash de passwords
- Multer para uploads
- JWT custom (sin librerías externas de JWT)

## Estructura del proyecto

```
src/
  app.module.ts          # Módulo raíz, DB y guard global
  main.ts                # Bootstrap, CORS, validation pipe, static assets
  auth/                  # Login y perfil (/auth/login, /auth/me)
  users/                 # CRUD de usuarios (solo SUPER_ADMIN)
  products/              # CRUD, filtros y upload de imágenes
  common/
    entities/            # Entidades TypeORM
    enums/               # Roles, categorías, materiales
    decorators/          # @Public(), @Roles(), @GetUserId()
    jwt/                 # JwtAuthModule custom
    dto/                 # DTOs compartidos
    000_datos_iniciales.sql
```

## Reglas de seguridad (CRÍTICO)

- Hay un **guard global** en AppModule que valida el token Bearer en TODOS los endpoints.
- Para hacer un endpoint público se usa el decorador `@Public()`. Sin él, el endpoint requiere token.
- Para restringir por rol se usa `@Roles(Role.OWNER, Role.SUPER_ADMIN)`.
- Nunca exponer rutas de admin sin el decorador `@Roles()` correspondiente.
- Los roles disponibles están en `src/common/enums/`.

## Convenciones de código

- Todos los módulos siguen la estructura estándar de NestJS: `module / controller / service`.
- Los DTOs van en `dto/` dentro de cada módulo y usan decoradores de `class-validator`.
- Las entidades TypeORM van en `src/common/entities/`.
- Los nombres de archivos en kebab-case: `create-product.dto.ts`, `products.service.ts`.
- Los endpoints públicos de productos no requieren autenticación.
- Los endpoints de escritura (POST, PATCH, DELETE) requieren rol OWNER o SUPER_ADMIN.

## Patrones establecidos

- Para filtros de productos (categoría, material, subcategoría, precio) se usan query params o params de ruta según el endpoint existente.
- Las imágenes se guardan en `uploads/` y se sirven en `/uploads/` como archivos estáticos.
- El servicio JWT custom está en `JwtAuthModule`; no usar `@nestjs/jwt` directamente.
- Variables de entorno en `.env.db` (no `.env`).

## Qué NO hacer

- No instalar librerías de JWT externas; el JWT es custom.
- No cambiar `synchronize: true` a menos que se migre explícitamente a migraciones.
- No agregar lógica de negocio en los controllers; va en los services.
- No crear entidades fuera de `src/common/entities/`.
- No exponer el campo `password` en ninguna respuesta de usuario.

## Tests

- Usar Jest (ya configurado en NestJS).
- Los archivos de test van junto al archivo que prueban: `products.service.spec.ts`.
- Para tests de integración, mockear TypeORM con `getRepositoryToken`.
- Priorizar tests de services, no de controllers.

## Variables de entorno necesarias

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=admin
DB_DATABASE=joyeria_db
PORT=3000
```

## Comandos útiles

```bash
npm run start:dev   # desarrollo con hot reload
npm run build       # compilar
npm run test        # jest
npm run test:e2e    # tests end-to-end
```

## Comportamiento obligatorio para CUALQUIER tarea

Antes de modificar, crear o eliminar cualquier archivo, el agente SIEMPRE debe:

### FASE 1 — Leer (sin tocar nada)
Leer todos los archivos relevantes para entender el contexto completo antes de actuar.

### FASE 2 — Presentar el plan y esperar aprobación
Mostrar el siguiente bloque y NO avanzar hasta recibir confirmación explícita del usuario:

```
📋 PLAN DE ACCIÓN — [tipo de tarea]

Archivos que voy a modificar/crear:
  1. [ruta del archivo]
     - Qué: [descripción del cambio]
     - Por qué: [justificación]
     - Riesgo: [Bajo / Medio / Alto]

Archivos que NO voy a tocar: [lista]

⚠️ Puntos de atención: [efectos secundarios, dependencias, riesgos]

¿Aprobás este plan? Respondé "sí" para continuar o indicá qué cambiar.
```

### FASE 3 — Ejecutar (solo con aprobación)
Aplicar exactamente lo aprobado. Si surge algo inesperado durante la ejecución,
pausar y reportar antes de continuar. Compilar con `npm run build` al finalizar.

### FASE 4 — Reportar
Listar cada cambio realizado y mostrar el resultado del build.

**Esta secuencia es innegociable. Ninguna tarea omite el plan de acción.**
