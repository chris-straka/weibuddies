import express from 'express';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@weibuddies/common';
import { indexProductRouter } from './routes';
import { createProductRouter } from './routes/new';
import { showProductRouter } from './routes/show';
import { updateProductRouter } from './routes/update';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  }),
);

app.use(currentUser);
app.use(createProductRouter);
app.use(showProductRouter);
app.use(indexProductRouter);
app.use(updateProductRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
