import { app } from './app';
import { kafka_init } from "./events/kafka"

const init = async () => {
  if (!process.env.JWT_KEY) throw new Error('[Products] JWT_KEY must be defined')
  if (!process.env.PGHOST) throw new Error("[Products] Can't find PGHOST")
  await kafka_init()
};

init();

app.listen(3000, () => {
  console.log('[Products] Listening on port 3000');
});

