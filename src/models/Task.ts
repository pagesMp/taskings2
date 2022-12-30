import { Model, DataTypes } from 'sequelize';
import db from '../config/database.conf';
import Task from '../../types/Task';

export class TaskModel extends Model<Task> {
    id: any
    userId: any
}       

TaskModel.init(
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize: db,
        tableName: 'tasks',
    }
);