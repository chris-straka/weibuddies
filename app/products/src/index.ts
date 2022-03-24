import { app } from './app';
import { kafkaInit, consumer } from './kafka';
import { OrderCreatedListener } from './events/listeners/OrderCreatedListener';
import { OrderCancelledListener } from './events/listeners/OrderCancelledListener';

const init = async () => {
  if (!process.env.JWT_KEY) throw new Error('[Products] JWT_KEY must be defined');
  if (!process.env.PGHOST) throw new Error("[Products] Can't find PGHOST");
  await kafkaInit();
  new OrderCreatedListener(consumer).listen();
  new OrderCancelledListener(consumer).listen();
};

init();

app.listen(3000, () => {
  console.log('[Products] Listening on port 3000');
});
