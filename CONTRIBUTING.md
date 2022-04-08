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

I used [WSL2](https://docs.microsoft.com/en-us/windows/wsl/compare-versions) to develop this application (linux) along with docker-desktop for windows. The default memory WSL2 allocates to to docker-desktop is 2GB, which isn't enough for this app. I had to go to %USERPROFILE% on my windows machine and create a [.wslconfig file](https://docs.microsoft.com/en-us/windows/wsl/wsl-config#configure-global-options-with-wslconfig) to add more memory. For reference, my .wslconfig file looks just like this.

```config
[wsl2]
memory=6GB
```

When developing the app, I had kafka running in its own terminal because it's just too noisy to use with skaffold and it slows everything down too much. All the other microservices have to wait for it and the source code for kafka never changes.

## Kafka

I'm using kafka's "kraft mode" instead of zookeeper. I'm also only using one broker for development because my terminal goes ballistic with "UnknownHostExceptions" when I try to use three. According to this [IBM tutorial](https://developer.ibm.com/tutorials/kafka-in-kubernetes/), "the name resolution of the three pods can take more time to work than it takes the pods to start, so you may see UnknownHostException warnings in the pod logs initially". So I'm guessing Kafka is a noisy boy, I'll switch to three nodes for production later. I also need more experience with handling kafka in general because I'm finding it difficult to make it work just the way I want it to (skaffold, testing, etc).

## ArgoCD & Bitnami Sealed Secrets

There are two k8s clusters. A local development cluster and a remote production cluster (AWS). The latter has argocd running inside it, which is an agent set to pull files from the [weibuddies-iac github repo](https://github.com/Chris56974/weibuddies-iac/tree/main). I put my IaC code in a separate github repo since it seems like a good practice ([source video](https://youtu.be/MeU5_k9ssrs?t=391). Putting it in its own repo lets you set separate access permissions on github and any changes to the infra code won't trigger any CI/CD pipelines in the application code. I made the infra repo a git submodule in this repo because I still needed the infra code for local development, and I've been told from the [12 factor app people](https://12factor.net/dev-prod-parity) that it's a good idea to match the development environment as close as possible to the production environment (I don't want to use docker compose for development and kubernetes for production or something like that).

The secrets in production.yaml are encrypted so they're safe to store in git. The only thing that can decrypt them is a controller that lives in the AWS k8s production cluster. I did this because of gitOps principles (move everything into git). 

The secrets in the development.yaml are unencrypted because if I encrypted them, nobody else would be able to develop locally without creating their own secrets. My development cluster is unique from everyone elses, so if I encrypted them with my controller it wouldn't work for anyone else.

Skaffold is the tool that's responsible for switching between development.yaml and production.yaml.
