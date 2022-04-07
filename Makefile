SHELL := /bin/bash

# Boot up all microservices on k8s http://localhost:80
dev: 
	skaffold dev 

# Rebuild all the docker images and run dev
devclean: 
	skaffold dev --cache-artifacts-false

# Install dependencies for each microservice locally so you don't get errors 
install:
	pushd ./app/auth && pnpm i && popd && \
	pushd ./app/client && pnpm i && popd && \
	pushd ./app/common && pnpm i && popd && \
	pushd ./app/expiration && pnpm i && popd && \
	pushd ./app/orders && pnpm i && popd && \
	pushd ./app/payments && pnpm i && popd && \
	pushd ./app/products && pnpm i && popd \

# Publish the common package (/app/common) to the npm registry 
# and then update all the microservices to use that new package
publish:
	pushd ./app/common && pnpm publish:patch && popd && \
	pushd ./app/auth && pnpm install @weibuddies/common@latest && popd && \
	pushd ./app/expiration && pnpm install @weibuddies/common@latest && popd && \
	pushd ./app/orders && pnpm install @weibuddies/common@latest && popd && \
	pushd ./app/payments && pnpm install @weibuddies/common@latest && popd && \
	pushd ./app/products && pnpm install @weibuddies/common@latest && popd \

lint:
	pushd ./app/auth && pnpm lint && popd && \
	pushd ./app/client && pnpm lint && popd && \
	pushd ./app/common && pnpm lint && popd && \
	pushd ./app/expiration && pnpm lint && popd && \
	pushd ./app/orders && pnpm lint && popd && \
	pushd ./app/payments && pnpm lint && popd && \
	pushd ./app/products && pnpm lint && popd \

### Commands that run on individual containers

# Boot up just a single microservice using docker compose
# http://localhost:3000
devauth:
	pushd ./app/auth && pnpm dev:local && popd

devclient:
	pushd ./app/client && pnpm dev && popd

lintclient:
	pushd ./app/client && pnpm lint && popd

# Deploy all microservices to production
prod: 
	skaffold dev -p production

commit:
	pushd ./weibuddies-iac && git add . && git commit && popd && git add . && git commit
