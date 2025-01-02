/**
 * SQLite Implementation
 * 
 */

import sqlite3 from 'sqlite3';
import { Database } from 'sqlite3';

/**
 * Repository implementation is defined in the database module
 */
export abstract class Repository {
    constructor (private db: Database) {}
}
type RepositoryCtor = new (db: Database) => Repository;

class DatabaseContext<T extends Repository> {
    private db: Database;
    private repositories: Map<new (db:Database) => T, T>;

    constructor (dbPath: string) {
        this.db = new sqlite3.Database(dbPath);
        this.repositories = new Map();
    }

    getRepository<U extends T>(repository: new (db: Database) => U): U {
        if (!this.repositories.has(repository)) {
            this.repositories.set(repository, new repository(this.db));
        }
        const _repository = this.repositories.get(repository);
        if (!_repository) throw new Error();
        return _repository as U;
    }
}

export default new DatabaseContext('./data');
