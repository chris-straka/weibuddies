# kafka

This readme document is a copy paste of the official kafka/config/krarft/readme.md (with my own personal edits).

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

In kraft mode, you have two types of nodes - brokers & controllers. You usually have 3-5 controllers for availability purposes. You designate whether a node is a controller or a broker by setting its `process.roles` property to broker, controller or broker,controller (broker,controller means the node operates as both, aka a combined node). You set this setting in the kafka/config/kraft/server.properties file. Combined nodes are convenient but if they crash as a broker then it can no longer work as a controller.

Every node (broker or controller) has to know who all the controllers are. You do that by enumerating the controllers in the `controller.quorum.voters` key in the same kafka/config/kraft/server.properties file. The "quorum" part refers to how controllers agree with each other ow what the cluster metadata is. An example config for a controller looks like this...

```bash
process.roles=controller # this is a controller
node.id=1                # this is the 1st controller
listeners=CONTROLLER://controller1.example.com:9093 # other controllers can reach me here

# You list a controller like this -> id@host:port
# So in a cluster with three controllers, you list all of them like this
controller.quorum.voters=1@controller1.example.com:9093,2@controller2.example.com:9093,3@controller3.example.com:9093
```