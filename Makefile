SHELL := /bin/bash

dev: 
	skaffold dev

# my npm login user is student-4911
# this command publishes the common folder to npm
publish:
	pushd ./app/common && pnpm publish:patch && popd 