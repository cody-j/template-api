import { Counter } from '@/models/counter.model';
import { Repository } from '@/database/sqlite';

export default class CounterRepository extends Repository {
    async increment (id: string): Promise<Counter> {
        this.db
        return {id: '', counter: 1}
    }
}
