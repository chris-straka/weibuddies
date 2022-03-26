import { app } from './app';
import { kafkaInit, consumer } from './kafka';
import { ExpirationCompleteListener } from './events/listeners/ExpirationCompleteListener';
import { PaymentCreatedListener } from './events/listeners/PaymentCreatedListener';
import { ProductCreatedListener } from './events/listeners/ProductCreatedListener';
import { ProductUpdatedListener } from './events/listeners/ProductUpdatedListener';

const init = async () => {
  if (!process.env.JWT_KEY) throw new Error('JWT_KEY must be defined');
  await kafkaInit();
  new ExpirationCompleteListener(consumer).listen();
  new PaymentCreatedListener(consumer).listen();
  new ProductCreatedListener(consumer).listen();
  new ProductUpdatedListener(consumer).listen();
};

init();

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
