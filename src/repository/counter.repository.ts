import { Counter } from '@/models/counter.model';
import Database, { Repository } from '@/database';
import { DBError } from '@/middleware/error.middleware';

export default class CounterRepository extends Repository {
    async increment (id: string): Promise<Counter> {
        try {
            const results = await this.db.get<Counter>(`
                insert into
                    counter (id, counter)
                    values (?, 1)
                on conflict (id) do update set
                    counter = counter + 1
                returning *;
            `, [id]);
            if (!results) throw new Error();
            return results;
        } catch (err) {
            throw new DBError();
        }
    }

    async getAll (): Promise<Counter[]> {
        const results = await this.db.query<Counter>(`
            select * from counter;
        `);
        if (!results) throw new Error();
        return results;
    }
}
