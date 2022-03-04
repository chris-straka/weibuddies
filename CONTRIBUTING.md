# Contributing 

You're going to need to install these tools

- [Git](https://git-scm.com/)

- [Node](https://nodejs.org/en/)

- [Docker & Kubernetes](https://www.docker.com/products/docker-desktop)

- [ingress-nginx](https://kubernetes.github.io/ingress-nginx/deploy/)

- [Helm](https://helm.sh/docs/intro/install/#helm)

- [Skaffold](https://skaffold.dev/docs/install/)

- [Minikube](https://minikube.sigs.k8s.io/docs/) (if you're using Linux and not docker for desktop)

I used WSL2 to develop this application, but instead of using minikube I used the kubernetes cluster that came with docker-desktop. I don't have any minikube setup instructions so you're going to have to figure that stuff out if you use minikube. You can see which commands are available by visiting the Makefile at the root of this project. Here are some other helpful commands for rerference

```bash
kubectl config current-context # see which k8s cluster the skaffold command is going to use
kubectl -n ingress-nginx get services -o wide -w ingress-nginx-controller # find the loadBalancer IP 
```

## Kafka

I'm using kafka's "kraft mode" instead of zookeeper. I'm also only using one broker for development because my terminal goes ballistic with "UnknownHostExceptions" when I try to use three. I used this [IBM tutorial](https://developer.ibm.com/tutorials/kafka-in-kubernetes/) to set things up and they mention this issue saying "the name resolution of the three pods can take more time to work than it takes the pods to start, so you may see UnknownHostException warnings in the pod logs initially".
