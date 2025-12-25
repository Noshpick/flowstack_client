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

# Переменные окружения для сборки (будут переопределены в Dokploy)
ENV NEXT_PUBLIC_API_URL=https://api.flowstack.ru
ENV NEXT_PUBLIC_SHARED_SECRET=placeholder

# Собираем Next.js приложение
RUN bun run build

# Stage 3: Production образ
FROM oven/bun:1-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Создаем пользователя для безопасности
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Копируем необходимые файлы
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Переключаемся на непривилегированного пользователя
USER nextjs

# Открываем порт
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Запускаем приложение
CMD ["node", "server.js"]
