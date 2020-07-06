import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

import AppError from '../../error/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default async function ensureAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Missing auth token.', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, authConfig.jwt_secret) as ITokenPayload;

    req.user = {
      id: decoded.sub,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid token.', 401);
  }
}
