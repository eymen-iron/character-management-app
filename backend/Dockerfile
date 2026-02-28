FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# Generate Prisma client and build
RUN npx prisma generate
RUN pnpm run build

EXPOSE 4000

# Migrate, seed (idempotent), then start
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && node dist/src/main"]
