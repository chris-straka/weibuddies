import { Request, Response } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (err: Error, _req: Request, res: Response) => {
  if (err instanceof CustomError) return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  if (process.env.NODE_ENV !== 'production') console.log('Error Handler: ', err);

  return res.status(500).send({ errors: [{ message: 'Something went wrong with the server' }] });
};
