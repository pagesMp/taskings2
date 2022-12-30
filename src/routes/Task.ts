import { Router } from 'express';
const taskRouter = Router();
import { create, getAll, get, update, remove } from '../controllers/Task';
const verifyToken = require('../middleware/verifyToken');
const cors = require('cors')

taskRouter.post('/create', cors(), verifyToken, create);
taskRouter.get('/get/all', cors(), verifyToken, getAll);
taskRouter.get('/get/:id', cors(), verifyToken, get);
taskRouter.put('/update/:id', cors(), verifyToken, update);
taskRouter.delete('/delete/:id', cors(), verifyToken, remove);

export default taskRouter;