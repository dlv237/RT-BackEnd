# Stage 1: build
FROM node:20-bookworm-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci
# OpenSSL en build (para generar cliente si lo requiere)
RUN apt-get update -y && apt-get install -y --no-install-recommends openssl libssl3 ca-certificates && rm -rf /var/lib/apt/lists/*

COPY prisma ./prisma
RUN npx prisma generate

COPY tsconfig.json ./
COPY src ./src
COPY openapi ./openapi
COPY openapi.json ./
RUN npm run build

# Stage 2: runtime
FROM node:20-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

# OpenSSL en runtime (para que el engine cargue correctamente)
RUN apt-get update -y && apt-get install -y --no-install-recommends openssl libssl3 ca-certificates && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

COPY prisma ./prisma
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/app.js"]