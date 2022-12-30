import { CreationOptional, ForeignKey } from "sequelize";
import Task from "./Task";
import User from "./User";

export default interface Relation {
    id?: CreationOptional<number>
    taskId:ForeignKey<Task['id']>
    userId:ForeignKey<User['id']>
}