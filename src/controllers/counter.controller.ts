import { Request, Response } from 'express';
import CounterService, { CounterInput } from '@/services/counter.service';
import { Counter } from '@/models/counter.model';
import CounterRepository from '@/repository/counter.repository';

export default class CounterController {
    private service;
    constructor (service: any) {
        this.service = service
    }
    private serviceInput (operation: string, context: Request): CounterInput {
        return {id: ''};
    }

    async count (context: Request): Promise<Counter> {
        return await this.service.countOne(this.serviceInput('countOne', context));
    }
}
