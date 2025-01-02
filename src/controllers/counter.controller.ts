import { NextFunction, Request, Response, Router } from 'express';
import CounterService, { CounterInput } from '@/services/counter.service';
import { Counter } from '@/models/counter.model';
import CounterRepository from '@/repository/counter.repository';
import { Controller } from '.';
import Database from '@/database';

class CounterController implements Controller {
    private service: CounterService;

    constructor (db: Database) {
        const repo = db.getRepo(CounterRepository);
        this.service = new CounterService(repo);
    }

    registerRoutes (router: Router) {
        router.post('/increment/:id', (req: Request, res: Response, next: NextFunction) => {
            
        });
    };

    private serviceInput (operation: string, context: Request): CounterInput {
        return {id: ''};
    }

    async count (context: Request): Promise<Counter> {
        return await this.service.countOne(this.serviceInput('countOne', context));
    }
}

export default CounterController;
