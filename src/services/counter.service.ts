import CounterRepository from '@/repository/counter.repository';
import { Counter } from '@/models/counter.model';

export type CounterInput = {
    id: string;
}

export default class CounterService {
    private repository;
    constructor () {
        this.repository = new CounterRepository();
    }

    async countOne (context: CounterInput): Promise<Counter> {    
        return await this.repository.increment(context.id);
    }
}
