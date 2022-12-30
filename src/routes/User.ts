import { Router } from 'express';
const userRouter = Router();
import { register, login } from '../controllers/User';

userRouter.post('/register', register);
userRouter.post('/login', login);

export default userRouter;