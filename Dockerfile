# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.15.1
FROM node:${NODE_VERSION}-alpine AS base

LABEL fly_launch_runtime="Next.js"
RUN corepack enable

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* .yarnrc.yml ./
RUN yarn --immutable

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/.yarnrc.yml ./.yarnrc.yml
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_BASE_PATH=https://backend.papiayam.com
ENV NEXT_PUBLIC_SIGN_UP_PATH=/v1/users/signup
ENV NEXT_PUBLIC_GET_USER=/v1/users
ENV NEXT_PUBLIC_SIGN_IN_PATH=/v1/users/signin
ENV NEXT_PUBLIC_EMAIL_VERIFICATION_PATH=/v1/email-verification
ENV NEXT_PUBLIC_SIGN_IN_BY_GOOGLE_PATH=/v1/oauth/google
ENV NEXT_PUBLIC_SIGN_IN_BY_FACEBOOK_PATH=/v1/oauth/facebook
ENV NEXT_PUBLIC_SIGN_OUT_PATH=/v1/users/signout
ENV NEXT_PUBLIC_UPDATE_USER_NAME_PATH=/v1/users/update-name
ENV NEXT_PUBLIC_SESSION_STATS_PATH=/v1/sessions/stats
ENV NEXT_PUBLIC_USER_STATS_PATH=/v1/users/stats

RUN yarn build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN mkdir .next

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
