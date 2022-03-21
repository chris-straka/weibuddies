import { app } from './app';
import { kafkaInit } from './events/kafka';

const jeff = 'alfjdlaskdfj';

console.log(jeff);

const init = async () => {
  if (!process.env.JWT_KEY) throw new Error('JWT_KEY must be defined');
  await kafkaInit();
};

init();

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
