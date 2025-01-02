import { Request, Response } from 'express';
import CounterService, { CounterInput } from '@/services/counter.service';
import { Counter } from '@/models/counter.model';

export default class CounterController {
    private service;
    constructor () {
        this.service = new CounterService();
    }
    private serviceInput (operation: string, context: Request): CounterInput {
        return {id: ''};
    }

    count (context: Request): Counter {
        return this.service.countOne(this.serviceInput('countOne', context));
    }
}
