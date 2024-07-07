import path from "path";
import fs from "fs";

import { NextFunction, Request, Response } from "express";


import { Message } from "../models/message";

const getMessages = (req: Request, res: Response, next: NextFunction) => {
    try {
        fs.readFile(path.join(__dirname, '..', 'data', 'data.json'), 'utf-8', (err, data) => {
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
        throw error;
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
        fs.readFile(path.join(__dirname, '..', 'data', 'data.json'), 'utf-8', (err, data) => {
            if (err) {
                throw err;
            }

            const messages = JSON.parse(data ? data : '[]');
            messages.push(message);
            fs.writeFile(path.join(__dirname, '..', 'data', 'data.json'), JSON.stringify(messages), err => {
                if (err) {
                    throw err;
                }

                res.status(201).json({ message: message });
            })
        })
    } catch (error) {
        throw error;
    }
}

export { getMessages, postMessage };
