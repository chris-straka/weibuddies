# Learning

## Working with Kafka as a StatefulSet is tricky sometimes

I ran into [this error](https://www.orchome.com/10529) and it was hard to figure out because the proposed solution didn't seem to work. After reading this [post on SO](https://stackoverflow.com/questions/65687515/delete-kubernetes-persistent-volume-from-statefulset-after-scale-down), I thought maybe I could delete the persistent volume claim and have it delete the persistent volume so I could reset the data in kafka but it didn't seem to work for me either. I think it was because I was running into [this problem some people are talking about on github here](https://github.com/kubernetes/kubernetes/issues/69697). I ended up fixing things by going into the troubleshooting page for docker desktop and resetting everything there and it seems to work okay after that. I had to reinstall nginx-ingress controller.

## Honestly, working with Kafka in general is tricky sometimes

I ran into a myriad of problems [like the one this guy had](https://github.com/confluentinc/examples/issues/398). I also had troubles setting up tests with kafka. I don't want to mock kafka because I don't think those tests would be very useful, I prefer to test against the real thing using docker containers. But Kafka is really noisy and takes a while to run in a container. I think I also need to learn more about testing software in docker with jest because the containers aren't shutting down and I'm getting strange errors (despite all the tests passing). Cool thing is I think I can use fake timers with jest, so I can test the order expiration service without waiting a day before an order expires.

## Choice of hash function

I was originally going to use bcrypt, but I decided on scrypt instead (using the node crypto module) because I like to trim down on dependencies and prefer using core modules. But I also read that argon2 is popular and that it won a [password hashing competition](https://en.wikipedia.org/wiki/Password_Hashing_Competition). I'm not sure how the competition works, but my guess is it's a lot harder to brute force a password that has been hashed with argon2 so maybe I'll try that later.

## SEO

It somehow slipped my mind, but I just realized that the google search crawler can't crawl anything that requires user authentication (it can't create an account and sign in). My original idea would've been completely disastrous for SEO lol and changes how I want the site to work.

## Skaffold stuff

My skaffold file is massive because I repeat myself for both profiles (dev and production). I think I need to check out how to pass environment variables to the same profile so I can keep things dry. I'm not sure how I want to do that, I think I might have to use kustomize to do something like that or maybe there's something I can do natively within skaffold.

## I'm starting to like Jest & Superagent over things like postman
