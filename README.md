# RT Backend

API en Express + Prisma lista para escalar (Docker, Makefile, middlewares base, Prisma singleton).

## Requisitos

- Node.js 18+ (recomendado 20+)
- npm
- Docker

## Inicio rápido

1) Crear el archivo de entorno `.env`

- Opción A (rápida):

```bash
cp .env.example .env
```

- Opción B (tal como lo requieres):

```bash
touch .env
# Abre .env y copia/pega el contenido desde .env.example, luego ajusta valores
```

2) Instalar dependencias

```bash
make install
```

3) Ejecutar en desarrollo

```bash
make dev
```

La API expone un endpoint de salud en `GET /health`.

## Variables de entorno

- `PORT`: Puerto de la API (por defecto 3000)
- `NODE_ENV`: development | production
- `DATABASE_URL`: cadena de conexión (usa la de Supabase por entorno)
- `DIRECT_URL`: (opcional) URL directa para Prisma (útil si usas pooling en DATABASE_URL)

## Prisma

- Generar cliente:

```bash
make prisma-generate
```

- Crear migración (cuando el modelo esté definido):

```bash
make prisma-migrate name=init
```

- Abrir Studio:

```bash
make prisma-studio
```

## Build y ejecución

```bash
make build
make start
```

## Docker

```bash
make docker-build
PORT=3000 make docker-run
```

O con Docker Compose (solo servicio API, DB externa en Supabase):

```bash
make compose-up
make compose-down
```

## Estructura del proyecto

- `src/app.ts`: Punto de entrada de la aplicación
- `src/middlewares/*`: 404 y manejador de errores
- `src/lib/prisma.ts`: Singleton de PrismaClient
- `src/controllers/*`: Controladores (o Resolvers)
- `src/services/*`: Servicios de dominio (incluye `healthService`)
- `src/routes/index.ts`: Registro de rutas (incluye `GET /health`)
- `prisma/schema.prisma`: Esquema de Prisma
- `Makefile`: Comandos útiles (dev, build, prisma, docker, compose)
- `Dockerfile` y `docker-compose.yml`: Contenerización de la API