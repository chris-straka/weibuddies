# I got this from the kafka/config/kraft/README and edited it to my liking

To bring up a kraft cluster...

```bash
# generate a cluster ID for your new kafka cluster
./bin/kafka-storage.sh random-uuid # xtzWWN4bTjitpL3kfd9s5g

# format the storage directories for each node (make sure to use the same clusterID for each node)
./bin/kafka-storage.sh format -t <uuid> -c ./config/kraft/server.properties 

# then start the Kafka server on each node using the properties you like
./bin/kafka-server-start.sh ./config/kraft/server.properties
```

## Overview

("set this property" === server.properties file)

In kraft mode, you have two types of nodes - brokers & controllers. You usually pick 3-5 controller nodes for availability. You designate whether a node is a controller or a broker by setting the `process.roles` property to broker, controller or broker,controller (aka a combined node). Combined nodes are convenient but they can crash as a broker then no longer work as a controller. 

Every node (brokers & controllers) has to know who all the controllers are. You do that by enumerating the controllers in the `controller.quorum.voters` key. The "quorum" part refers to how controllers have to agree on what the cluster metadata is. An example config for 1 controller (out of 3) looks like this...

```bash
process.roles=controller
node.id=1
listeners=CONTROLLER://controller1.example.com:9093
controller.quorum.voters=1@controller1.example.com:9093,2@controller2.example.com:9093,3@controller3.example.com:9093
# id@host:port,id@host:port, etc
```