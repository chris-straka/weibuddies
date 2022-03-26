import { kafkaInit, consumer } from './kafka';
import { app } from './app';
import { OrderCancelledListener } from './events/listeners/OrderCancelledListener';
import { OrderCreatedListener } from './events/listeners/OrderCreatedListener';

const init = async () => {
  if (!process.env.JWT_KEY) throw new Error('[Payments] JWT_KEY must be defined');
  if (!process.env.STRIPE_KEY) throw new Error("[Payments] Can't find the STRIPE_KEY");
  await kafkaInit();
  new OrderCancelledListener(consumer).listen();
  new OrderCreatedListener(consumer).listen();
};

init();

app.listen(3000, () => {
  console.log('[Payments] Listening on port 3000');
});
