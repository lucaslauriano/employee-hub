
FROM node:22-alpine 

FROM base AS deps

# Adds libc6-compat - compatibility for applications expecting glibc  
# Alpine Linux is a lightweight Linux distribution that uses musl 
# as its standard C library instead of glibc.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# create cache directory for npm
COPY package.json  package-lock.json* ./
RUN npm ci


COPY  . .
RUN npm run build

# Production image, copy all the files and run next
FROM base AS production
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_SHARP_PATH /app/node_modules/sharp

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=deps /app/public ./public

RUN mkadir .next
RUN chown -R nextjs:nodejs .next

COPY --from=deps /app/next.config.ts ./
COPY --from=deps --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=deps --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Stand alone output
CMD ["node", "server.js"]
