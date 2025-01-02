import database from '@/database/sqlite';
import CounterRepository from '@/repository/counter.repository';
import { Counter } from '@/models/counter.model';


export type CounterInput = {
    id: string;
}

export default class CounterService {
    private counterRepository: CounterRepository;
    constructor () {
        this.counterRepository = database.getRepository(CounterRepository);
    }

    async countOne (context: CounterInput): Promise<Counter> {    
        return await this.counterRepository.increment(context.id);
    }
}
