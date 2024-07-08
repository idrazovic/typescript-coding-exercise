import path from "path";

import { NextFunction, Request, Response } from "express";

import { Message } from "../models/message";
import { handleError } from "../util/errorHandler";
import { CustomRequest } from "../models/custom-request";

const filePath = path.join(__dirname, '..', 'data', 'data.json');

const getMessages = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const messages = await Message.find();
        res.status(200).json({ messages });
    } catch (error) {
        handleError(error, next);
    }
};

const postMessage = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const message = new Message({
            text: req.body.text,
            user: req.userId,
        });
        const data = await message.save();
        res.status(201).json({ message: data });
    } catch (error) {
        handleError(error, next);
    }
}

export { getMessages, postMessage };
