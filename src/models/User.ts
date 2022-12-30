import { Model, DataTypes } from 'sequelize';
import db from '../config/database.conf';
import User from '../../types/User';

export class UserModel extends Model<User> {
    id:any
    name:any
    password:any
    email:any
    salt:any
    userId:any
}

UserModel.init(
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        name: {
            type: DataTypes.STRING,
            allowNull:false
        },
        email: {
            type: DataTypes.STRING,
            allowNull:false,
            unique:true          
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false          
        },
        salt: {
            type: DataTypes.STRING,
            allowNull:false
        },
    },
    {
        sequelize:db,
        tableName: 'users',
    }
);