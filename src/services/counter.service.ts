import CounterRepository from '@/repository/counter.repository';

type CounterInput = {
    id: string;
}

export default class Counter {
    private repository;
    constructor () {
        this.repository = new CounterRepository();
    }

    countOne (context: CounterInput) {    
        this.repository.increment(context.id);
    }
}
