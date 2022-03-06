import { app } from './app';

const init = async () => {
  if (!process.env.JWT_KEY) throw new Error('[Products] JWT_KEY must be defined')

  try {
    process.on('SIGINT', () => { });
    process.on('SIGTERM', () => { });
  } catch (err) {
    console.log(err);
  }
};

app.listen(3000, () => {
  console.log('[Products] Listening on port 3000');
});

init();
