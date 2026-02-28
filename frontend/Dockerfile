FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build — GRAPHQL_URL is server-side only, set at build time for API route
ARG GRAPHQL_URL=http://backend:4000/graphql
ENV GRAPHQL_URL=${GRAPHQL_URL}

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
