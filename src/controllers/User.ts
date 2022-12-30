import { Request, Response } from 'express';
import { UserModel } from '../models/User';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

export const getAll = async (request: Request, response: Response): Promise<Response> => {
    const allUsers: UserModel[] = await UserModel.findAll();
    return response.status(200).json(allUsers);
}

export const register = async (request: Request, response: Response): Promise<Response> => {
    try {
        const {name, email, password } = request.body;
        const salt = bcrypt.genSaltSync(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        const newUser = new UserModel({ "name": name, "email": email, "password": encryptedPassword, "salt": salt });
        await newUser.save();
        return response.status(200).json({ message: 'Account created' });
    } catch (error) {
        return response.status(500).json({ message: 'Failed to create your account', error: error });
    }
};

export const login = async (request: Request, response: Response): Promise<Response> => {
    try {
        const email:string = request.body.email;
        const password:string = request.body.password;
        
        const user = await UserModel.findOne({ where: { email } });

        if (!email || !password ) {
            throw new Error('Missing email or password');
        };

        if(!user){
            throw new Error('User not found');
        };

        const encryptedPassword = await bcrypt.hash(password, user.salt);

        if(user.password !== encryptedPassword){
            throw new Error('Login failed');
        };
        const token = jwt.sign({id:user.id, email: email }, process.env.JWT_SECRET, { expiresIn: '24h' });
        return response.status(200).json({ message: 'logged', data: {token: token, user: user} });
        
    } catch (error:any) {
        return response.status(500).json({ message: error.message });
    }
};

export const get = async (request: Request, response: Response): Promise<Response> => {
    try {
        const email = (request.body as { email: string }).email;
        const user = await UserModel.findOne({ where: { email } });
        return response.status(200).json({ message: 'logged', data: user });
    } catch (error) {
        return response.status(500).json({ message: error });
    }
};
