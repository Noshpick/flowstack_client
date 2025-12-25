# Stage 1: Установка зависимостей
FROM oven/bun:1-alpine AS deps
WORKDIR /app

# Копируем файлы зависимостей
COPY package.json bun.lock* ./
RUN bun install

# Stage 2: Сборка приложения
FROM oven/bun:1-alpine AS builder
WORKDIR /app

# Копируем зависимости из предыдущего stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Переменные окружения для сборки
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SHARED_SECRET

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_SHARED_SECRET=${NEXT_PUBLIC_SHARED_SECRET}
ENV NODE_ENV=production

# Собираем Next.js приложение
RUN bun run build

# Stage 3: Production образ
FROM oven/bun:1-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Копируем необходимые файлы
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Открываем порт
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Запускаем приложение через bun
CMD ["bun", "run", "start"]
