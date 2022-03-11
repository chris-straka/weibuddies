# Learning

## Working with Kafka as a StatefulSet is tricky sometimes

I ran into [this error](https://www.orchome.com/10529) and it was hard to figure out because the proposed solution didn't seem to work. After reading this [post on SO](https://stackoverflow.com/questions/65687515/delete-kubernetes-persistent-volume-from-statefulset-after-scale-down), I thought maybe I had to delete the persistent volume claim so that it also deletes the persistent volume but it didn't seem to work for either. I think it was because I was running into [this problem being talked about on github](https://github.com/kubernetes/kubernetes/issues/69697). I ended up going into the troubleshooting page for docker desktop's and resetting everything and it seems to work okay after that. I had to reinstall nginx-ingress controller. 

## Choice of hash function

I was originally going to use bcrypt but I decided on scrypt instead (from the node crypto module) because I like to trim down on dependencies and prefer using core modules. But I also read that argon2 is popular and that it won a [password hashing competition](https://en.wikipedia.org/wiki/Password_Hashing_Competition). I'm not sure what they do in that competition, but my guess is it's a lot harder to brute force a password that has been hashed with argon2.

## SEO 

It somehow slipped my mind, but I just realized that the google search crawler can't crawl anything that requires user authentication (it can't create an account and sign in). My original idea would've been completely disastrous for SEO lol.