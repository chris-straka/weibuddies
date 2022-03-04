SHELL := /bin/bash

dev: 
	skaffold dev

# Install all the dependencies for the services locally
install:
	pushd ./app/auth && pnpm i && popd && \
	pushd ./app/client && pnpm i && popd && \
	pushd ./app/common && pnpm i && popd && \
	pushd ./app/expiration && pnpm i && popd && \
	pushd ./app/orders && pnpm i && popd && \
	pushd ./app/payments && pnpm i && popd && \
	pushd ./app/products && pnpm i && popd \

# my npm login user is student-4911
# this command publishes the common folder to npm
publish:
	pushd ./app/common && pnpm publish:patch && popd 