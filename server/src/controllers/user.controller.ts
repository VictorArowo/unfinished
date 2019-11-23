import { Request, Response } from 'express';
import { Document, Error } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Users from '../models/user.model';
import {
  generateAccessToken,
  generateRefreshToken
} from '../utils/generateToken';

const tokenList: Array<String> = [];

export interface User extends Document {
  email: string;
  password: string;
}

export const signup = async (req: Request, res: Response) => {
  let { email, password } = req.body;

  try {





    let exists = await Users.findOne({ email });
    if (exists) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = bcrypt.hashSync(password, 14);
    let newUser = new Users({
      email,
      password: hashedPassword
    });

    let user = await newUser.save();

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.status(201).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  let { email, password } = req.body;

  try {
    let user = await Users.findOne({ email });
    if (!user) return res.status(400).json({ error: "User doesn't exist" });

    if (bcrypt.compareSync(password, (user as User).password)) {
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      tokenList.push(refreshToken);
      return res.status(200).json({ accessToken, refreshToken });
    }
    return res.status(401).json({ message: 'Invalid Credentials' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (refreshToken === null)
    return res.sendStatus(401).json({ error: 'No Refresh Token Sent' });
  if (!tokenList.includes(refreshToken))
    return res.status(403).json({ error: 'Refresh Token Invalid' });

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as any,
    (err: any, user: any) => {
      if (err) return res.status(401).json('Your token is invalid');
      const accessToken = generateAccessToken(user);
      res.json({ accessToken });
    }
  );
};
