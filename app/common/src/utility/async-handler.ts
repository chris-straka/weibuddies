import {
  Handler, NextFunction, Response, Request,
} from 'express';

export const asyncHandler = (handler: Handler): Handler => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await handler(req, res, next);
  } catch (error) {
    next(error);
  }
};
