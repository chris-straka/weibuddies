# Microservices app 

## Tech
[Vue](https://vuejs.org/), [Pinia](https://pinia.vuejs.org/), [Vue Router](https://router.vuejs.org/), [Vite](https://vitejs.dev/), [Node](https://nodejs.org/en/), [Express](https://expressjs.com/), [Postgres](https://www.postgresql.org/), [Docker](https://www.docker.com/products/docker-desktop), [K8s](https://kubernetes.io/), [Skaffold](https://skaffold.dev/), [Kafka](https://kafka.apache.org/), [Argo CD](https://argo-cd.readthedocs.io/en/stable/)

[This app](https://github.com/Chris56974/weibuddies) is basically [kijiji](https://www.kijiji.ca/) except people are encouraged to buy stuff with cryptocurrency. The transactions are facilitated through [coinbase](https://www.coinbase.com/) through the [coinbase API](https://developers.coinbase.com/). Potential buyers will also be able to reserve an item from a seller before anyone else has the chance to buy it. 

- For more information on how to develop this app locally, please see [CONTRIBUTING](https://github.com/Chris56974/wei-buddies/blob/main/CONTRIBUTING.md)
- For more information on the license, please see [LICENSE](https://github.com/Chris56974/wei-buddies/blob/main/LICENSE)

## IaC

Some helpful commands but here are some other helpful ones.

```bash
# See which k8s cluster you're using (i.e. the one skaffold is going to use)
kubectl config current-context

# Find the loadbalancer IP
kubectl -n ingress-nginx get services -o wide -w ingress-nginx-controller

# If you need to install ingress-nginx
helm upgrade --install ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace ingress-nginx --create-namespace

# If you want to use helm for sealedSecrets
helm repo add sealed-secrets https://bitnami-labs.github.io/sealed-secrets

# you can create an encrypted secrets file using this
kubectl create secret generic mysecret --dry-run=client --from-literal foo=bar --output json | kubeseal | tee mysecret.yaml

# To do a git pull on the submodule and grab the commit
git pull --recurse-submodules

# To grab the latest changes from a git submodule
cd weibuddies-iac && git pull origin main
git submodule update --remote --merge # shorthand
```

## Attribution

- [Webmakaka's project for guidance on k8s and microservices](https://github.com/webmakaka/Microservices-with-Node-JS-and-React)
- [Joshua Purcell & Steve Martinelli for their kraft kafka tutorial](https://github.com/IBM/kraft-mode-kafka-on-kubernetes)
- [Moenz's kafka kraft docker image for dev/testing](https://github.com/moeenz/docker-kafka-kraft)
- [ibid](https://developer.ibm.com/tutorials/kafka-in-kubernetes/)
- [For design inspiration](https://app.haikei.app/)
- [Blobs for some SVG blobs](https://blobs.app/)
- [Coinbase API for payments](https://developers.coinbase.com/)
- [Abdelrahman Awad's composable functions](https://logaretm.com/blog/my-favorite-5-vuejs-composables)
- [Robin Moffatt's helpful post on kafka-listeners](https://rmoff.net/2018/08/02/kafka-listeners-explained)
- [Bitnami for the sealed secret controller & kubeseal](https://github.com/bitnami-labs/sealed-secrets)
- [Code magic's helpful video bitnami and argo](https://www.youtube.com/watch?v=FJBmovA2Ej4)