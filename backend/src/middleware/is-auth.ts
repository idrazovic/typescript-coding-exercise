import { Response, NextFunction } from "express";

import jwt from 'jsonwebtoken';

import { ErrorMessage } from "../models/error-message";
import { CustomRequest } from "../models/custom-request";
import { JWTPayload } from "../models/jwt-payload";

const secret = 'somesupersecretsecret';


const isAuth = async (req: CustomRequest, res: Response, next: NextFunction) => {
    let error: ErrorMessage;

    if (!req.get('Authorization')) {
        error = new Error('Not authenticated');
        error.statusCode = 401;
        next(error);
    }

    const token = req.get('Authorization')?.split(' ')[1] || '';

    let decodedToken: string | jwt.JwtPayload;
    try {

        decodedToken = jwt.verify(token, secret);

        if (!decodedToken) {
            error = new Error('Not authenticated');
            error.statusCode = 401;
            next(error);
        }

        req.userId = (decodedToken as JWTPayload).userId;
        next();
    } catch (err) {
        error = new Error('Not authenticated');
        error.statusCode = 500;
        next(error);
    }
}

export { isAuth };