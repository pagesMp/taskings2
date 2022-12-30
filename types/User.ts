import { CreationOptional, ForeignKey } from "sequelize";
import Task from "./Task";

export default interface User {
    id?: CreationOptional<number>;
    name: string;
    email: string;
    password: string;
    salt: string;
    taskId:ForeignKey<Task['id']>;
}