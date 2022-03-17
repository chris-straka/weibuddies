import { app } from './app';

const init = async () => {
  if (!process.env.JWT_KEY) throw new Error('JWT_KEY must be defined');
};

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

init();
