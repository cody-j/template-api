import { NextFunction, Request, Response } from "express";

export class DBError extends Error {
    statusCode: number = 500;
    message: string = 'db error'
}

export function errorHandler (err: Error, req: Request, res: Response, next: NextFunction) {
    if (res.headersSent) {
        next(err);
    }

    if (err instanceof DBError) {
        res.status(err.statusCode).json(err.message);
        return;
    }

    res.status(500).json('server error')
    return;
}
