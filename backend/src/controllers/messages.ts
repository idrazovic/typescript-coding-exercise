import path from "path";
import fs from "fs";

import { NextFunction, Request, Response } from "express";

import { Message } from "../models/message";
import { handleError } from "../util/errorHandler";

const filePath = path.join(__dirname, '..', 'data', 'data.json');

const getMessages = (req: Request, res: Response, next: NextFunction) => {
    try {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                throw err;
            }

            if (!data) {
                res.status(200).json({ messages: [] });
                return;
            }

            res.status(200).json({ messages: JSON.parse(data) });
        })
    } catch (error) {
        handleError(error, next);
    }
};

const postMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const message: Message = {
            id: new Date().toISOString(),
            text: req.body.text,
            user: 'admin',
            timestamp: new Date().toISOString()
        }
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                throw err;
            }

            const messages = JSON.parse(data ? data : '[]');
            messages.push(message);
            fs.writeFile(filePath, JSON.stringify(messages), err => {
                if (err) {
                    throw err;
                }

                res.status(201).json({ message: message });
            })
        })
    } catch (error) {
        handleError(error, next);
    }
}

export { getMessages, postMessage };
