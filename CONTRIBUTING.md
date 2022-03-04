# Contributing 

You're going to need to install these tools

- [Git](https://git-scm.com/)

- [Node](https://nodejs.org/en/)

- [Docker & Kubernetes](https://www.docker.com/products/docker-desktop)

- [Helm](https://helm.sh/docs/intro/install/#helm)

- [ingress-nginx](https://kubernetes.github.io/ingress-nginx/deploy/)

- [Skaffold](https://skaffold.dev/docs/install/)

- [Minikube](https://minikube.sigs.k8s.io/docs/) (if using Linux and not docker for desktop)

I used WSL2 to develop this application but I didn't use minikube, I used the kubernetes cluster that came with docker-desktop instead. I don't have any minikube setup instructions so you're going to have to figure stuff out if you use minikube. You can see which commands are available by visiting the Makefile at the root of this project.

```bash
kubectl config current-context # see which k8s cluster the skaffold command is going to use
kubectl -n ingress-nginx get services -o wide -w ingress-nginx-controller # find the loadBalancer IP 
```

## Kafka (on startup) goes ballistic in the terminal I think that's normal for kraft mode?

I setup things up using this [IBM tutorial for k8s and kafka](https://developer.ibm.com/tutorials/kafka-in-kubernetes/), and they mention that "the name resolution of the three pods can take more time to work than it takes the pods to start, so you may see UnknownHostException warnings in the pod logs initially". My terminal completely blows up which seems insane, but I think it all works.
