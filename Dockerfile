FROM node:22.12.0-slim AS base

FROM base AS deps
WORKDIR /src

COPY package.json yarn.lock* ./
RUN yarn --frozen-lockfile

FROM base AS builder
WORKDIR /src
COPY --from=deps /src/node_modules ./node_modules
COPY . ./

RUN yarn build

FROM gcr.io/distroless/nodejs22-debian12 AS runner
WORKDIR /src

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /src/public ./public
COPY --from=builder /src/next.config.ts ./
COPY --from=builder /src/.next/static ./.next/static
COPY --from=builder /src/.next/standalone ./

USER nonroot

CMD ["server.js"]
