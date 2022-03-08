#!/bin/bash

# Grab the first 6 characters from the hostname
# The hostname will be different for each server in k8s
NODE_ID=${HOSTNAME:6}

# this is what the broker will use to create server sockets.
LISTENERS="PLAINTEXT://:9092,CONTROLLER://:9093"

# this is what the clients will use to connect to the brokers
ADVERTISED_LISTENERS="PLAINTEXT://kafka-$NODE_ID.$SERVICE.$NAMESPACE.svc.cluster.local:9092"

# Each node needs to know who all the controller nodes are
# this loop will enumerate all the controllers so I can add it to the server.properties later
CONTROLLER_QUORUM_VOTERS=""
for i in $(seq 0 $REPLICAS); do
  if [[ $i != $REPLICAS ]]; then
    CONTROLLER_QUORUM_VOTERS="$CONTROLLER_QUORUM_VOTERS$i@kafka-$i.$SERVICE.$NAMESPACE.svc.cluster.local:9093,"
  else
    CONTROLLER_QUORUM_VOTERS=${CONTROLLER_QUORUM_VOTERS::-1}
  fi
done

mkdir -p $SHARE_DIR/$NODE_ID

# All the nodes need to share the same cluster ID
if [[ ! -f "$SHARE_DIR/cluster_id" && "$NODE_ID" = "0" ]]; then
  CLUSTER_ID=$(kafka-storage.sh random-uuid)
  echo $CLUSTER_ID >$SHARE_DIR/cluster_id
else
  CLUSTER_ID=$(cat $SHARE_DIR/cluster_id)
fi

# Edit the server.properties file for each server with the new variables
sed -e "s+^node.id=.*+node.id=$NODE_ID+" \
  -e "s+^controller.quorum.voters=.*+controller.quorum.voters=$CONTROLLER_QUORUM_VOTERS+" \
  -e "s+^listeners=.*+listeners=$LISTENERS+" \
  -e "s+^advertised.listeners=.*+advertised.listeners=$ADVERTISED_LISTENERS+" \
  -e "s+^log.dirs=.*+log.dirs=$SHARE_DIR/$NODE_ID+" \
  /opt/kafka/config/kraft/server.properties >server.properties.updated &&
  mv server.properties.updated /opt/kafka/config/kraft/server.properties

# this step used to be automated but now it's required
kafka-storage.sh format -t $CLUSTER_ID -c /opt/kafka/config/kraft/server.properties

# Run the server
exec kafka-server-start.sh /opt/kafka/config/kraft/server.properties
