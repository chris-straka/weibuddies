# Contributing 

You're going to need to install these tools

- [Git](https://git-scm.com/)

- [Node](https://nodejs.org/en/)

- [Docker & Kubernetes](https://www.docker.com/products/docker-desktop)

- [Helm](https://helm.sh/docs/intro/install/#helm)

- [ingress-nginx](https://kubernetes.github.io/ingress-nginx/deploy/)

- [Skaffold](https://skaffold.dev/docs/install/)

- [Minikube](https://minikube.sigs.k8s.io/docs/) (if using Linux and not docker for desktop)

I used WSL2 to develop this application but I didn't use minikube, I used the kubernetes cluster that came with docker-desktop instead. You can see which commands you can run by visiting the Makefile at the root of this project.

```bash
kubectl config current-context # see which k8s cluster the skaffold command is going to use
kubectl --namespace ingress-nginx get services -o wide -w ingress-nginx-controller # find the loadBalancer IP 
```
