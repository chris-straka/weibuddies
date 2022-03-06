import { Kafka } from "kafkajs"

const kafka_init = async () => {
  if (!process.env.CLIENT_ID) throw new Error('[Products] Client-ID must be defined')
  if (!process.env.BROKERS) throw new Error('[Products] Can\'t find a list of brokers')

  const kafka = new Kafka({
    clientId: process.env.CLIENT_ID,
    brokers: process.env.BROKERS.split(" ")
  })

  const producer = kafka.producer()
  const consumer = kafka.consumer({ groupId: 'orders-group' })

  try {
    await producer.connect()
    await consumer.connect()
    await consumer.subscribe({ topic: 'products-topic' })
    await consumer.subscribe({ topic: 'payments-topic' })

    // Wait on expiration complete, payment created, product created and updated
    // then create and publish orders
    await consumer.run({})

    return {
      producer,
      consumer
    }

  } catch (error) {
    console.log(error);
  }
}

export const kafka = kafka_init()