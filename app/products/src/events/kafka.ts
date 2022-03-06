import { Kafka } from "kafkajs"
import { OrderStatus } from "@weibuddies/common"
import { orderCreatedHandler, orderCancelledHandler } from "./kafkaHandlers"

const kafka_init = async () => {
  if (!process.env.CLIENT_ID) throw new Error('[Products] Client-ID must be defined')
  if (!process.env.BROKERS) throw new Error("[Products] Can't find a list of brokers")

  const kafka = new Kafka({
    clientId: process.env.CLIENT_ID,
    brokers: process.env.BROKERS.split(" ")
  })

  const producer = kafka.producer()
  const consumer = kafka.consumer({ groupId: 'products-group' })

  try {
    await producer.connect()
    await consumer.connect()
    await consumer.subscribe({ topic: 'orders-topic' })

    await consumer.run({
      async eachMessage({ topic, partition, message }) {
        if (message.value?.toString() === OrderStatus.Cancelled) orderCancelledHandler(producer)
        if (message.value?.toString() === OrderStatus.Created) orderCreatedHandler(producer)
      },
    })

    return {
      producer,
      consumer
    }

  } catch (error) {
    console.log(error);
  }
}

export const kafka = kafka_init()