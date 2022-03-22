# @weibuddies/common

This is an npm package that I intend to reuse across all my microservices. 

The errors, middleware, and utility functions should be self-explanatory (I hope). 

The tricky part to understand (I think) is the events. 

## Events 

A lot of my microservices use kafka (expiration, orders, payments, products). This means they all need to emit and receive events. So instead of implementing that in each microservice individually, I have moved all of it into this NPM package. Then everytime a microservice needs to publish something to Kafka, I will grab the AbstractPublisher from this npm package and attach the appropriate event interface to it.