import { Kafka } from "kafkajs"
import { OrderCancelledListener } from "./events/listeners/OrderCancelledListener"
import { OrderCreatedListener } from "./events/listeners/OrderCreatedListener"
import { ProductCreatedPublisher } from "./events/publishers/ProductCreatedPublisher"
import { ProductUpdatedPublisher } from "./events/publishers/ProductUpdatedPublisher"

const kafka_init = async () => {
  if (!process.env.CLIENT_ID) throw new Error('[Products] Client-ID must be defined')
  if (!process.env.BROKERS) throw new Error("[Products] Can't find a list of brokers")

  const kafka = new Kafka({
    clientId: process.env.CLIENT_ID,
    brokers: process.env.BROKERS.split(" ")
  })

  try {
    const producer = kafka.producer().connect()
    const consumer = kafka.consumer({ groupId: "orders-group" }).connect()

    const orderCreatedListener = new OrderCreatedListener(consumer)
    const orderCancelledListener = new OrderCancelledListener(consumer)
    const productCreatedPublisher = new ProductCreatedPublisher(producer);
    const productUpdatedPublisher = new ProductUpdatedPublisher(producer);

    return {
      orderCreatedListener,
      orderCancelledListener,
      productCreatedPublisher,
      productUpdatedPublisher
    }
  } catch (error) {
    console.log(error);
  }
}

export const kafka = kafka_init()