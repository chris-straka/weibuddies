FROM node:16-alpine as base
RUN mkdir /app && chown node:node /app
WORKDIR /app
RUN corepack enable 
USER node
COPY --chown=node:node package.json pnpm-lock.yaml ./
RUN corepack prepare pnpm@6.32.3 --activate
COPY . .

CMD [ "pnpm", "dev:k8s" ]