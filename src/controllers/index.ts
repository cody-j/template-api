import { NextFunction, Request, Response, Router } from 'express';

export interface Controller {
    registerRoutes: (router: Router) => Router;
}

export function routeHandler<T> (controllerFn: (req: Request) => Promise<T>): (req: Request, res: Response, next: NextFunction) => any {
    return async (req: Request, res: Response, next: NextFunction) => {
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
