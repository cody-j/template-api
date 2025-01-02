import { NextFunction, Request, Response, Router } from 'express';
import CounterService, { CounterInput } from '@/services/counter.service';
import { Counter } from '@/models/counter.model';
import CounterRepository from '@/repository/counter.repository';
import { Controller } from '.';
import Database from '@/database';
import { routeHandler } from '.';

class CounterController implements Controller {
    private service: CounterService;

    constructor (db: Database) {
        const repo = db.getRepo(CounterRepository);
        this.service = new CounterService(repo);
    }

    count = async (req: Request): Promise<Counter>  => {
        return await this.service.countOne({ id: req.params.id });
    }

    registerRoutes (router: Router) {
        router.post('/increment/:id', routeHandler<Counter>(this.count));   
        return router;
    };
}

export default CounterController;
