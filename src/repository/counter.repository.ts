import { Counter } from '@/models/counter.model';
import { Repository } from '@/database/sqlite';

export default class CounterRepository extends Repository {
    async increment (id: string): Promise<Counter> {
        console.log('Repository: incrementing');
        return {
            id,
            counter: 1,
        }
    }
}
