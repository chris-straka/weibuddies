import { kafkaInit, consumer } from './kafka';
import { OrderCreatedListener } from './events/listeners/OrderCreatedListener';

const init = async () => {
  await kafkaInit();
  new OrderCreatedListener(consumer).listen();
};

init();
