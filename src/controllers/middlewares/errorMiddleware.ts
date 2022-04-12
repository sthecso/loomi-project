import { NextFunction, Request, Response } from 'express';
import HttpException from '../../utils/httpException';

const errorMiddlweare = (
  err: HttpException | Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof HttpException) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: err.message });
};

export default errorMiddlweare;
