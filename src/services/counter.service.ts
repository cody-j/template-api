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

    countOne (context: CounterInput): Counter {    
        return this.repository.increment(context.id);
    }
}
