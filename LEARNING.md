# Learning

## Working with Kafka as a StatefulSet is tricky sometimes

I ran into [this error](https://www.orchome.com/10529) and it was hard to figure out because the proposed solution didn't seem to work. After reading this [post on SO](https://stackoverflow.com/questions/65687515/delete-kubernetes-persistent-volume-from-statefulset-after-scale-down), I thought maybe I had to delete the persistent volume claim so that it also deletes the persistent volume but it didn't seem to work for me either. I think it was having problems deleting the pv after the pvc and I think I was running into [this github issue](https://github.com/kubernetes/kubernetes/issues/69697). I ended up going into the troubleshooting page for docker desktop's and resetting things there and everything seemed to work okay after that. 

## Choice of hash function

I decided on scrypt (from the node crypto module) because I like using the core modules and I like to trim down on my dependencies. But I also read that argon2 is popping off in the [password hashing competition](https://en.wikipedia.org/wiki/Password_Hashing_Competition), so maybe that's the better choice.