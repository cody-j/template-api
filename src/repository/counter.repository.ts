import { Counter } from '@/models/counter.model';

export default class CounterRepository {
    async increment (id: string): Promise<Counter> {
        console.log('Repository: incrementing');
        return {
            id,
            counter: 1,
        }
    }
}
