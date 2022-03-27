FROM node:16-alpine as base
RUN mkdir /app && chown node:node /app
WORKDIR /app
RUN corepack enable 
USER node
COPY --chown=node:node package.json pnpm-lock.yaml ./
RUN corepack prepare pnpm@6.32.3 --activate

FROM base as dev
ENV NODE_ENV=development
RUN pnpm install 
COPY . .
CMD [ "pnpm", "dev:k8s" ]

FROM dev as build
USER node
RUN pnpm build

FROM base as dependencies
USER node
RUN pnpm install -P

FROM gcr.io/distroless/nodejs:16 as prod
USER node
ENV NODE_ENV=production
COPY --from=build ./app/build ./build
COPY --from=dependencies ./app/node_modules ./node_modules
CMD ["./build/index.js"]