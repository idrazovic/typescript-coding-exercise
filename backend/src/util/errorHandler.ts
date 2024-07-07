import { ErrorMessage } from "../models/error-message";

export const handleError = (err: any, next: any) => {
    const error: ErrorMessage = new Error(err.message);

    if (!error.statusCode) {
        error.statusCode = 500;
    }

    return next(error);
}
