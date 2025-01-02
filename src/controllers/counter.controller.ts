import { Request, Response, Router } from 'express';
import CounterService, { CounterInput } from '@/services/counter.service';
import { Counter } from '@/models/counter.model';
import CounterRepository from '@/repository/counter.repository';
import { Controller } from '.';

class CounterController implements Controller {
    private service;
    constructor (service: any) {
        this.service = service
    }
    registerRoutes (router: Router) {
        router.get
    };

    private serviceInput (operation: string, context: Request): CounterInput {
        return {id: ''};
    }

    async count (context: Request): Promise<Counter> {
        return await this.service.countOne(this.serviceInput('countOne', context));
    }
}

export default CounterController;
