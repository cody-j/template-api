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
    db: Database;
    constructor (db: Database) {
        this.db = db;
    }
}

export default class DatabaseContext {
    private static instance: DatabaseContext;
    private db?: Database;
    
    private repositories: Map<any, Repository>;
    static getInstance () {
        if (!DatabaseContext.instance) {
            DatabaseContext.instance = new DatabaseContext();
        }
        return DatabaseContext.instance;
    }
    constructor () {
        this.repositories = new Map();
    }

    async initialize (dbPath: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }
    
    getDatabase() {
        if (!this.db) {
            throw new Error('No DB');
        }
        return this.db;
    }

    getRepository<T extends Repository>(repository: new (db: Database) => T): T {
        if (!this.db) {
            throw new Error();
        }
        if (!this.repositories.has(repository)) {
            this.repositories.set(repository, new repository(this.db));
        }
        const _repository = this.repositories.get(repository);
        if (!_repository) throw new Error();
        return _repository as T;
    }
}
