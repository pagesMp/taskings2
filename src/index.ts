import express, { Express, Request, Response } from 'express';
import "reflect-metadata";
import * as dotenv from "dotenv";
import db from './config/database.conf';

import taskRouter from './routes/Task';
import userRouter from './routes/User';
import { UserModel } from './models/User';
import { TaskModel } from './models/Task';
const cors = require('cors'); 

const port = process.env.PORT || 8000;

const app: Express = express();
app.use(express.json());
app.use(cors())
dotenv.config();

UserModel.hasMany(TaskModel, {
    sourceKey: 'id',
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
TaskModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    targetKey: 'id'
});

app.use('/auth', userRouter);
app.use('/tasks', taskRouter);


app.get("/", (req: Request, res: Response) => {
    return res.status(200).send("Aplicación de taskings corriendo");
});

app.get('*', (req, res) => {
    return res.status(404).send('404 Route not found')
});

app.listen(port, () => {
    console.log(`Api abierta en el puerto ${port}`);
    db.sync().then(() => console.log('Connection with db'));
});