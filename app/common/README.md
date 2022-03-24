# @weibuddies/common

This is an npm package exclusively meant for the [Weibuddies side project](https://github.com/Chris56974/wei-buddies) that I have going on @ github. 

I intend to reuse this package across all my microservices. It is comprised of errors, events, middleware and utility functions.

The errors, middleware, and utility functions should be self-explanatory (I think). 

The tricky part to understand (in my opinion) is the events. 

## Events 

I have four microservices in weibuddies (so far) that use kafka (expiration, orders, payments, products). They each emit/receive different kinds of events, so instead of declaring those events in each microservice I have decided to put them here in the npm package instead. Everytime my microservice needs to emit something, it will go and grab the AbstractPublisher and pass in the right event (i.e. IOrderCreated). The same is true for when the microservice needs to consume an something (it grabs AbstractListener and passes in an event like IOrderCreated).