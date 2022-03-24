import { kafkaInit } from './kafka';
import { orderCreatedListener } from './events/listeners/OrderCreatedListener';

// How long should an order last before getting cancelled by this service
const delay = 1000 * 60 * 60 * 24; // 1 day

const init = async () => {
  await kafkaInit();
  await orderCreatedListener(delay); // When an order is created, cancel it after this delay
};

init();
