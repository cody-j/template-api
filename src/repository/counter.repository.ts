import { Counter } from '@/models/counter.model';
import db from '@/database/index';

export default class CounterRepository {
    async increment (id: string): Promise<Counter> {
        return {id: '', counter: 1}
    }
}
