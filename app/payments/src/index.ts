import { app } from 'app';
import { OrderCancelledListener } from './events/listeners/OrderCancelledListener';
import { OrderCreatedListener } from './events/listeners/OrderCreatedListener';
import { natsWrapper } from 'NatsWrapper';

const init = async () => {
  if (!process.env.JWT_KEY) throw new Error('[Payments] JWT_KEY must be defined');
  if (!process.env.MONGO_URI) throw new Error('[Payments] MONGO_URI must be defined');
  if (!process.env.NATS_CLUSTER_ID) throw new Error('[Payments] NATS_CLUSTER_ID must be defined');
  if (!process.env.NATS_CLIENT_ID) throw new Error('[Payments] NATS_CLIENT_ID must be defined');
  if (!process.env.NATS_URL) throw new Error('[Payments] NATS_URL must be defined');
  if (!process.env.STRIPE_KEY) throw new Error('[Payments] STRIPE_KEY must be defined');

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsWrapper.client.on('close', () => {
      console.log('[Payments] NATS connection closed!');
      process.exit();
    });

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    new OrderCreatedListener(natsWrapper.client).listen();
    new OrderCancelledListener(natsWrapper.client).listen();
  } catch (err) {
    console.log(err);
  }
};

app.listen(3000, () => {
  console.log('[Payments] Listening on port 3000');
});

init();
