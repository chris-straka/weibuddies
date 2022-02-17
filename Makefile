SHELL := /bin/bash

dev: 
	skaffold dev

# my npm login user is student-4911
publish-common:
	pushd ./app/common && pnpm publish:patch && popd 