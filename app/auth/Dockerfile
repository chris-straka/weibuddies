FROM node:17-alpine

RUN mkdir /opt/node_app && chown node:node /opt/node_app
WORKDIR /opt/node_app

RUN corepack enable 
COPY --chown=node:node package.json pnpm-lock.yaml* ./
RUN corepack prepare pnpm@6.30.1 --activate && pnpm install
COPY . .

CMD [ "pnpm", "start" ]