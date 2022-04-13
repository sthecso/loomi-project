import { sign, verify } from 'jsonwebtoken';
import 'dotenv/config';

const secret: string = (process.env.JWT_SECRET as string) || 'secret';

const jwtSign = (payload: object, duration = '1h') =>
  sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn: duration,
  });

const jwtVerify = (token: string) =>
  verify(token, secret, { algorithms: ['HS256'] });

export {
  jwtSign,
  jwtVerify,
};
