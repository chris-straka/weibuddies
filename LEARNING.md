# Learning

## Scrypt vs Bcryptjs vs Argon2

I decided on scrypt (from the builtin node crypto module) because I like using native modules. I read that argon2 is newer and is more memory intensive for the dude trying to  it's memory intensive. After reading the official docs for scrypt it sounds like it's also memory intensive so that sounds good to me

## Data persistence not managed by k8s 

It looks like the persistent volume for a stateful set is not wiped out when the application is scaled down. After reading this [post on SO](https://stackoverflow.com/questions/65687515/delete-kubernetes-persistent-volume-from-statefulset-after-scale-down), it looks like I have to delete the PVC everytime I run into [this error](https://www.orchome.com/10529).