import { Kafka } from "kafkajs"
import { app } from './app';
import { OrderCancelledListener } from './events/listeners/OrderCancelledListener';
import { OrderCreatedListener } from './events/listeners/OrderCreatedListener';

const disconnect = (...listeners: any[]) => listeners.forEach(listener => listener.disconnect())

const init = async () => {
  if (!process.env.JWT_KEY) throw new Error('[Products] JWT_KEY must be defined')
  if (!process.env.PGHOST) throw new Error("[Products] Can't find PGHOST")


  try {
    const producer = kafka.producer()
    const consumer = kafka.consumer({ groupId: "orders-group"})

    new OrderCreatedListener(consumer).listen();
    new OrderCancelledListener(consumer).listen();

    process.on('SIGINT', () => {});
    process.on('SIGTERM', () => { });
  } catch (err) {
    console.log(err);
  }
};

app.listen(3000, () => {
  console.log('[Products] Listening on port 3000');
});

init();
