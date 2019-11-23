import jwt from 'jsonwebtoken';
import { Document } from 'mongoose';

interface User extends Document {
  email: String;
  subject?: Number;
}

export const generateAccessToken = (user: User): string => {
  const payload = {
    subject: user.id || user.subject,
    email: user.email
  };

  const options = {
    expiresIn: '20s'
  };

  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as any, options);
};

export const generateRefreshToken = (user: User): string => {
  const payload = {
    subject: user.id,
    email: user.email
  };

  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as any);
};
