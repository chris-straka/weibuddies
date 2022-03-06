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

# The npm login user is student-4911
# this command publishes the /app/common folder to npm
# and then installs the new dependency
publish:
	pushd ./app/common && pnpm publish:patch && popd && \
	pushd ./app/auth && pnpm install @weibuddies/common@latest && popd && \
	pushd ./app/expiration && pnpm install @weibuddies/common@latest && popd && \
	pushd ./app/orders && pnpm install @weibuddies/common@latest && popd && \
	pushd ./app/payments && pnpm install @weibuddies/common@latest && popd && \
	pushd ./app/products && pnpm install @weibuddies/common@latest && popd \