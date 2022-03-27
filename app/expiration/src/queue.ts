import Queue from 'bull';
import { OrderExpiredPublisher } from './events/publishers/OrderExpiredPublisher';
import { producer } from './kafka';

if (!process.env.REDIS_HOST) throw new Error("Can't find redis");

const expirationQueue = new Queue<{ orderId: string }>('order:expiration', {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

// After the delay, pop the job off the queue and tell everyone the order is now cancelled
expirationQueue.process(async (job: any) => {
  new OrderExpiredPublisher(producer).publish({ orderId: job.data.orderId });
});

export { expirationQueue };
