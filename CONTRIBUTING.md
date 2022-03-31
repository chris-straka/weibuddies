# Contributing

You're going to need to install these tools to develop this application

- [Git](https://git-scm.com/)

- [Node](https://nodejs.org/en/)

- [Pnpm](https://pnpm.io/)

- [Docker & Kubernetes](https://www.docker.com/products/docker-desktop) (or minikube if you're on linux)

- [ingress-nginx](https://kubernetes.github.io/ingress-nginx/deploy/)

- [Helm](https://helm.sh/docs/intro/install/#helm)

- [Skaffold](https://skaffold.dev/docs/install/)

- [Make](https://stackoverflow.com/questions/32127524/how-to-install-and-use-make-in-windows)

- [Kubeseal*](https://github.com/bitnami-labs/sealed-secrets)

I used [WSL2](https://docs.microsoft.com/en-us/windows/wsl/compare-versions) to develop this application (linux) along with docker-desktop for windows. The default memory WSL2 allocates to to docker-desktop is 2GB, which isn't enough for this app. I had to go to %USERPROFILE% on my windows machine and create a [.wslconfig file](https://docs.microsoft.com/en-us/windows/wsl/wsl-config#configure-global-options-with-wslconfig) to add more memory. For reference, my .wslconfig file looks like this.

```config
[wsl2]
memory=6GB
```

The makefile has some commands but here are some more helpful ones.

```bash
# See which k8s cluster you're using (i.e. the one skaffold is going to use)
kubectl config current-context

# Find the loadbalancer IP
kubectl -n ingress-nginx get services -o wide -w ingress-nginx-controller

# If you need to install ingress-nginx
helm upgrade --install ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace ingress-nginx --create-namespace

# If you want to use helm to install sealedSecrets
helm repo add sealed-secrets https://bitnami-labs.github.io/sealed-secrets

# you can create an encrypted secrets file using this
kubectl create secret generic mysecret --dry-run=client --from-literal foo=bar --output json | kubeseal | tee mysecret.yaml

# to do a git pull on submodules 
git pull --recurse-submodules

# To grab the latest changes from a git submodule
cd weibuddies-iac && git pull origin master

# this is a shorthand I think, haven't tried it yet
git submodule update --remote --merge
```

## Kafka

I'm using kafka's "kraft mode" instead of zookeeper. I'm also only using one broker for development because my terminal goes ballistic with "UnknownHostExceptions" when I try to use three. According to this [IBM tutorial](https://developer.ibm.com/tutorials/kafka-in-kubernetes/), "the name resolution of the three pods can take more time to work than it takes the pods to start, so you may see UnknownHostException warnings in the pod logs initially". So I'm guessing Kafka is a noisy boy, I'll switch to three nodes for production later. I also need more experience with handling kafka in general because I'm finding it difficult to make it work just the way I want it to (testing, etc).

## ArgoCD & Bitnami Sealed Secrets

There are two k8s clusters. A local development cluster and a remote production cluster (AWS). The latter has argocd running inside it, which is an agent set to pull files from the [weibuddies-iac github repo](https://github.com/Chris56974/weibuddies-iac/tree/main). I put my IaC code in a separate github repo since it seems like a good practice ([source video](https://youtu.be/MeU5_k9ssrs?t=391). Putting it in its own repo lets you set separate access permissions on github and any changes to the infra code won't trigger any CI/CD pipelines in the application code. I made the infra repo a git submodule in this repo because I still needed the infra code for local development, and I've been told from the [12 factor app people](https://12factor.net/dev-prod-parity) that it's a good idea to match the development environment as close as possible to the production environment (and it makes things look like one codebase).

The secrets in production.yaml are encrypted so they're safe to store in git. The only thing that can decrypt them is a controller in the aws production cluster. I did this because of gitOps principles (move everything into git). 

The secrets in the development.yaml are unencrypted because if I encrypted them, nobody else would be able to use those secrets for their local development cluster because only the local cluster on my machine is capable of decrypting them.

Skaffold is the one responsible for switching between development.yaml and production.yaml.
