import sqlite3 from 'sqlite3';
import { Database as sqlite } from 'sqlite3';

export default class Database {
    private static db: sqlite;
    public static isInitialized: Boolean = false;
    constructor () {}

    private static ddl: string = `
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
    
    static async initialize (): Promise<void> {
        if (Database.isInitialized) return;
        return new Promise((resolve, reject) => {
            Database.db = new sqlite3.Database(':memory:', (err) => {
                if (err) reject(err);
                Database.db.run(Database.ddl, (err) => {
                    if (err) reject(err);
                    Database.isInitialized = true;
                    resolve();
                });
            });
        });
    }

    static async query<T>(sql: string, params: unknown[] = []): Promise<T[]> {
        if (!Database.isInitialized) throw new Error('Database down!');
        return new Promise((resolve, reject) => {
            Database.db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows as T[]);
            });
        });
    }

    static async run(sql: string, params: unknown[] = []): Promise<void> {
        if (!Database.isInitialized) throw new Error('Database down!');
        return new Promise((resolve, reject) => {
            Database.db.run(sql, params, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }

    static async get<T>(sql: string, params: unknown[] = []): Promise<T | undefined> {
        if (!Database.isInitialized) throw new Error('Database down!');
        return new Promise((resolve, reject) => {
            Database.db.get(sql, params, (err, row) => {
                if (err) reject(err);
                else resolve(row as T);
            });
        });
    }
}
