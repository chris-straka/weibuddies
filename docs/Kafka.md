# Kafka

Kafka uses a bunch of servers called "brokers" that listen on port 9092. You then store a bunch of event logs called "topics" across all those brokers. Each record in a topic is immutable and can't be removed until the record expires. We separate topics into "partitions" to prevent them from getting too big.

Anything that writes to a topic is called a publisher, and anything that consumes messages from a topic is called a consumer. Both consumers and publishers have to be aware of partition ids when reading/writing from a topic with partitions. A consumer can read from one topic and then publish to another. It's the consumer's responsibility to poll the brokers for new messages, Kafka is not a push model. 

## Consumer Groups

Consumer groups let you decide whether Kafka works like an MQ or a pub/sub. You put consumers into a one group, and when any consumer from that group reads a message from a topic, you can mark that message as "read" for that entire consumer group. This will prevent any other consumer from that group from reading that same message, and you effectively have a queue. It still exists in the topic though, and other consumer groups can read that same message no problem. This is how you can make it work like a pub/sub. 

### Offsets

An offset is an integer used by Kafka to maintain the current position of a consumer. This is how Kafka prevents the consumer from reading the same message twice.

### Kafka Streams

Kafka streams is a client library for processing and analyzing data stored in Kafka. You can use it to enrich, transform or monitor data. It's a java application that can run outside the cluster (I think). It processes records sequentially and only once, it doesn't do any batching. It's different because Kafka streams are their own standalone java applications that run outside the cluster, where most other stream processing libraries run within the cluster.

### Kafka Connect

Kafka Connect, is a framework for reliably connecting Kafka to external systems such as databases, key-value stores, search indexes, data sources and file systems. Some examples involve hooking up kafka to your data lake for batch processing, or hooking it up to apache spark, flink, storm or kineses.

# Zookeeper

Zookeeper stores kafka cluster metadata and provides centralized management of the entire cluster. 