# Learning

## Working with Kafka as a StatefulSet is tricky sometimes

I ran into [this error](https://www.orchome.com/10529) and it was hard to figure out because the proposed solution didn't seem to work. After reading this [post on SO](https://stackoverflow.com/questions/65687515/delete-kubernetes-persistent-volume-from-statefulset-after-scale-down), I thought maybe I could delete the persistent volume claim and have it delete the persistent volume so I could reset the data in kafka but it didn't seem to work for me either. I think it was because I was running into [this problem some people are talking about on github here](https://github.com/kubernetes/kubernetes/issues/69697). I ended up fixing things by going into the troubleshooting page for docker desktop and resetting everything there and it seems to work okay after that. I had to reinstall nginx-ingress controller.

## Honestly, working with Kafka in general is tricky sometimes

I ran into a myriad of problems [like the one this guy had](https://github.com/confluentinc/examples/issues/398). I also had troubles setting up tests with kafka. I don't want to mock kafka because I don't think my tests would be that useful. But running Kafka in a container is still not that great either because kafka kraft is really noisy and takes a while to start in a container. I think I just need more experience on kafka and docker in order to do this properly because my containers aren't shutting down correctly and I'm getting strange errors from jest (despite all the tests passing). 

## Choice of hash function

I was originally going to use bcrypt, but I decided on scrypt instead (using the node crypto module) because I like to trim down on dependencies and prefer using core modules. But I also read that argon2 is popular and that it won a [password hashing competition](https://en.wikipedia.org/wiki/Password_Hashing_Competition). I'm not sure how the competition works, but my guess is it's a lot harder to brute force a password that has been hashed with argon2 so maybe I'll try that later.

## SEO

It somehow slipped my mind, but I just realized that the google search crawler can't crawl anything that requires user authentication (it can't create an account and sign in). My original idea would've been completely disastrous for SEO lol and it changes the site in a lot of ways on the frontend.

## Skaffold stuff

My skaffold file is massive because I repeat myself for both profiles (development and production). I think I need to figure out how to use the same profile twice because it's quite verbose (using env vars). I'm not sure how to do that though (kuztomize? skaffold?). Development is kind of slow on skaffold too (bringing the services online).

## Jest stuff

I think I like using Jest over Postman when testing out an API. I'm also realizing, that the way I structure my application has a big effect on my tests. Usually, the more I optimize my code for tests, the less coupling my code ends up having which is really nice. I want to be able to create integration tests between all my microservices but it seems tricky with kafka. I don't have the expertise for those kinds of tests right now so I might have to come back to that later, because tests would be really helpful in this regard.

## Distroless Overhyped?

I see a lot of discussion over whether distroless images even matter like this [redhat article](https://www.redhat.com/en/blog/why-distroless-containers-arent-security-solution-you-think-they-are). It might make it harder to scan my images, but I'll give them a shot for now.
