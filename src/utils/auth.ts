import { NextFunction, Response } from 'express';
import jwt = require('jsonwebtoken');
import { ExtendsRequest } from '../interfaces/IExtendsRequest';

const secret: string = (process.env.JWT_SECRET as string) || 'secret';

const jwtConfig: object = { algorithms: ['HS256'] };

const auth = async (req: ExtendsRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token not found' });
  }

  try {
    const payload = jwt.verify(token, secret, jwtConfig) as jwt.JwtPayload;

    req.user = payload;
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  return next();
};

export default auth;
