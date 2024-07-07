import { NextFunction, Request, Response } from "express";

import { Message } from "../models/message";


const getMessages = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const messages: Message[] = [
            {
                id: '1',
                text: 'Hello, World!',
                user: 'admin',
                timestamp: new Date().toISOString()
            },
            {
                id: '2',
                text: 'Hello, World 2!',
                user: 'admin',
                timestamp: new Date().toISOString()
            }
        ]
        res.status(200).json({ messages: messages });
    } catch (error) {
        throw error;
    }
};

export { getMessages };
