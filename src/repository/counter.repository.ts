import { Counter } from '@/models/counter.model';
import db from '@/database/index';

export default class CounterRepository {
    async increment (id: string): Promise<Counter> {
        console.log('inserting with id: ', id)
        const results = await db.get<Counter>(`
            insert into
                counter (id, counter)
                values (?, 1)
            on conflict (id) do update set
                counter = counter + 1
            returning *;
        `, [id]);
        if (!results) throw new Error();
        return results;
    }

    async getAll (): Promise<Counter[]> {
        const results = await db.query<Counter>(`
            select * from counter;
        `);
        if (!results) throw new Error();
        return results;
    }
}
