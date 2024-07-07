import express, { NextFunction, Request, Response } from 'express';
import bodyParser from "body-parser";

import messagesRoutes from './routes/messages';
import { ErrorMessage } from './models/error-message';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/messages', messagesRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to backend');
});

app.use((error: ErrorMessage, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
