import { Request, Response } from 'express';
import Users from '../models/user.model';

export const getUserTasks = async (req: Request, res: Response) => {
  try {
    const { userId } = req as any;
    const user = await Users.findOne({ _id: userId });
    if (!user) return res.status(400).json({ error: 'User does not exist' });
    return res.status(200).json(user.tasks);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addTask = async (req: Request, res: Response) => {
  try {
    const { userId } = req as any;
    const {
      body: { title, priority }
    } = req;

    const newTask = {
      title,
      priority,
      completed: false
    };
    const user = await Users.findOneAndUpdate(
      { _id: userId },
      { $push: { tasks: newTask } },
      { new: true }
    );
    if (!user) return res.status(500).json({ error: 'Something went wrong' });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
