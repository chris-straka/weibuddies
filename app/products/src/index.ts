import { app } from './app';

const init = async () => {
  // if (!process.env.JWT_KEY) throw new Error('[Products] JWT_KEY must be defined')
};

app.listen(3000, () => {
  console.log('[Products] Listening on port 3000');
});

init();
