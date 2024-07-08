import express, { NextFunction, Request, Response } from 'express';
import bodyParser from "body-parser";
import mongoose from 'mongoose';

import messagesRoutes from './routes/messages';
import usersRoutes from './routes/users';
import { ErrorMessage } from './models/error-message';

const MONGO_DB_URI = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@node-rest-api.axitvrv.mongodb.net/?retryWrites=true&w=majority&appName=node-rest-api`;

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/messages', messagesRoutes);
app.use('/auth', usersRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to backend');
});

app.use((error: ErrorMessage, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
});

mongoose.connect(MONGO_DB_URI)
    .then(() => {
        app.listen(port);
    }).catch(err => {
        console.log(err);
    });
