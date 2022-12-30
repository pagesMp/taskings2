import { CreationOptional, ForeignKey } from "sequelize";
import User from "./User";

export default interface Task {
    id?: CreationOptional<number>;
    title: string;
    description: string;
    completed: boolean;
    userId:ForeignKey<User['id']>;
}