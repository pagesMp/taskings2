const jwt = require('jsonwebtoken');
import express, { NextFunction, Request, Response } from 'express';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            throw new Error('No authorization header');
        }
        const token = authorization.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            throw new Error('Invalid token');
        }

        res.locals.user = decoded;
        next();

    } catch (error: any) {
        return res.status(500).json(
            {
                success: false,
                message: error.message
            });
    }
}

module.exports = verifyToken;