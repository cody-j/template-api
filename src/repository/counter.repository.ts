import { Counter } from '@/models/counter.model';

export default class CounterRepository {
    increment (id: string): Counter {
        console.log('Repository: incrementing');
        return {
            id,
            counter: 1,
        }
    }
}
