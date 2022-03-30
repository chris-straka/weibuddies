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

- [Kubeseal\*](https://github.com/bitnami-labs/sealed-secrets)

* Only if you intend to change the sealed password for the secret.yaml

I used [WSL2](https://docs.microsoft.com/en-us/windows/wsl/compare-versions) to develop this application (linux), but instead of using minikube I used the kubernetes cluster that came with docker-desktop for windows. I left a bunch of commands you can use by visiting the Makefile at the root of this project. Here are some other helpful commands for reference.

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

# create an encrypted secrets file
kubectl create secret generic mysecret --dry-run=client --from-literal foo=bar --output json | kubeseal | tee mysecret.yaml

# To do a git pull on the submodules 
git pull --recurse-submodules

# To grab the latest changes from a git submodule
cd weibuddies-iac && git pull origin master

# this might be a shorthand, haven't tried it yet
git submodule update --remote --merge

```

The default memory that WSL2 allots to docker-desktop is 2GB, which is probably not enough (at least it wasn't for me when I tried it). I had to go to %USERPROFILE% on my windows computer and create a [.wslconfig file](https://docs.microsoft.com/en-us/windows/wsl/wsl-config#configure-global-options-with-wslconfig) to add more memory. My .wslconfig looks like this

```
[wsl2]
memory=6GB
```

## Kafka

I'm using kafka's "kraft mode" instead of zookeeper. I'm also only using one broker for development because my terminal goes ballistic with "UnknownHostExceptions" when I try to use three. According to this [IBM tutorial](https://developer.ibm.com/tutorials/kafka-in-kubernetes/), "the name resolution of the three pods can take more time to work than it takes the pods to start, so you may see UnknownHostException warnings in the pod logs initially". So it sounds like Kafka is a noisy boy, I'll switch to three nodes for production later.
