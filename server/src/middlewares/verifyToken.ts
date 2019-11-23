import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ error: 'No token passed' });

  jwt.verify(
    authorization,
    process.env.ACCESS_TOKEN_SECRET as any,
    (err: any, decoded: any) => {
      if (err) return res.status(401).json('Your token is invalid');
      (req as any).userId = (decoded as any).subject;
      next();
    }
  );
};

export default verifyToken;
