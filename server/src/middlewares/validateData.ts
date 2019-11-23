import joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

const Schema = joi.object({
  email: joi
    .string()
    .min(6)
    .required()
    .email(),
  password: joi.string().min(8)
});

const validateData = (req: Request, res: Response, next: NextFunction) => {
  const { error } = Schema.validate(req.body);
  if (error) return res.status(401).json({ error: error.details[0].message });

  next();
};

export default validateData;
