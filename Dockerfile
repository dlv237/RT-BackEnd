# syntax=docker/dockerfile:1.7

ARG NODE_VERSION=20.12.2
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app

# Install prod deps (prisma engine etc. compiled later)
COPY package*.json ./
RUN npm ci --omit=dev

FROM node:${NODE_VERSION}-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src ./src
COPY prisma ./prisma

# Generate Prisma client and build TS
RUN npx prisma generate
RUN npx tsc

FROM node:${NODE_VERSION}-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app

# Copy runtime node_modules from base (prod only)
COPY --from=base /app/node_modules ./node_modules

# Copy build artifacts
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

# Expose port
EXPOSE 3000

# Healthcheck (optional simple TCP)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD node -e "require('net').createConnection({host:'127.0.0.1', port: process.env.PORT||3000}).on('connect',()=>process.exit(0)).on('error',()=>process.exit(1))"

CMD ["node", "dist/app.js"]
