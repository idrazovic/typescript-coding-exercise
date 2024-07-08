import { NextFunction, Request, Response } from "express";

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { handleError } from "../util/errorHandler";
import { User } from "../models/user";
import { ErrorMessage } from "../models/error-message";

const postUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const passwordHash = await bcrypt.hash(req.body.password, 12);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: passwordHash
        });

        const data = await user.save();

        res.status(201).json({ 
            name: data.name,
            email: data.email
         });
    } catch (error) {
        handleError(error, next);
    }
}

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            const error: ErrorMessage = new Error('Invalid email or password');
            error.statusCode = 400;
            throw error;
        }

        const doMatch = await bcrypt.compare(req.body.password, user.password);
        if (!doMatch) {
            const error: ErrorMessage = new Error('Invalid email or password');
            error.statusCode = 400;
            throw error;
        }

        const token = jwt.sign(
            {
                email: user.email,
                userId: user._id.toString()
            },
            process.env.JWT_SECRET as string,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200).json({ token, userId: user._id.toString() });

    } catch (error) {
        handleError(error, next);
    }
}

export { postUser, loginUser };