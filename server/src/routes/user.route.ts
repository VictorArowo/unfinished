import express from 'express';
import { signup, login, getToken } from '../controllers/user.controller';
import validateData from '../middlewares/validateData';
import verifyToken from '../middlewares/verifyToken';
import { getUserTasks, addTask } from '../controllers/task.controller';

const { Router } = express;
const router = Router();

router.post('/signup', validateData, signup);
router.post('/login', validateData, login);
router.post('/token', getToken);

router.get('/tasks', verifyToken, getUserTasks);
router.post('/tasks', verifyToken, addTask);

export default router;
