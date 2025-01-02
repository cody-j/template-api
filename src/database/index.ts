import sqlite3 from 'sqlite3';
import { Database as sqlite } from 'sqlite3';

export abstract class Repository {
    protected db: Database;
    
    constructor(db: Database) {
        this.db = db;
    }
}

export default class Database {
    private static db: sqlite;
    private static repositories: Map<any, Repository> = new Map();
    private isInitialized: Boolean = false;
    
    constructor () {}

    public getRepo<T> (repository: new (db: Database) => T extends Repository ? T : never): T {
        if (!Database.repositories.has(repository)) {
            Database.repositories.set(repository, new repository(this));
        }
        const repo = Database.repositories.get(repository);
        if (!repo) throw new Error(`Couldn't get repository!`);
        return repo as T;
    }
    
    private ddl: string = `
        create table if not exists counter (
            id text not null primary key check (
                id like '%-%-%-%-%' and
                length(id) = 36
            )
            , counter integer default 1
            , createdAt datetime not null default current_timestamp
            , updatedAt datetime
            , deletedAt datetime
        );
    `;
    
 async initialize (): Promise<void> {
        if (this.isInitialized) return;
        return new Promise((resolve, reject) => {
            Database.db = new sqlite3.Database(':memory:', (err) => {
                if (err) reject(err);
                Database.db.run(this.ddl, (err) => {
                    if (err) reject(err);
                    this.isInitialized = true;
                    resolve();
                });
            });
        });
    }

 async query<T>(sql: string, params: unknown[] = []): Promise<T[]> {
        if (!this.isInitialized) throw new Error('Database down!');
        return new Promise((resolve, reject) => {
            Database.db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows as T[]);
            });
        });
    }

 async run(sql: string, params: unknown[] = []): Promise<void> {
        if (!this.isInitialized) throw new Error('Database down!');
        return new Promise((resolve, reject) => {
            Database.db.run(sql, params, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }

 async get<T>(sql: string, params: unknown[] = []): Promise<T | undefined> {
        if (!this.isInitialized) throw new Error('Database down!');
        return new Promise((resolve, reject) => {
            Database.db.get(sql, params, (err, row) => {
                if (err) reject(err);
                else resolve(row as T);
            });
        });
    }
}
