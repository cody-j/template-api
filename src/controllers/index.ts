import { NextFunction, Request, Response, Router } from 'express';

export interface Controller {
    registerRoutes: (router: Router) => void;
}

export function routeHandler<T> (controllerFn: (req: Request) => Promise<T>) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            const results =  await controllerFn(req);
            if (!results) {
                return res.status(200).json('ok');
            } else {
                return res.status(200).json(results);
            }
        } catch (err) {
            next(err);
        }
    }
}
