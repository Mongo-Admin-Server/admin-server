# Build Stage
FROM node:18-alpine as builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi
ENV NEXT_TELEMETRY_DISABLED 1
COPY . .
RUN npm run build

#Production Stage
FROM node:18-alpine as runner
WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .
COPY --from=builder /app/next.config.js .
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3402
ENV PORT 3402
ENTRYPOINT ["npm", "run", "mongo-admin"]
