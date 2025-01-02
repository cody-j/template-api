/**
 * SQLite Implementation
 * 
 */

import sqlite3 from 'sqlite3';
import { Database as sqlite } from 'sqlite3';

class Database {
    private db: sqlite;
    public static isInitialized: Boolean = false;
    constructor (dataDir: string) {}
    static async initialize () {
        if (Database.isInitialized) return;
        const db = new sqlite3.Database(':memory:');
        Database.isInitialized = true
    }

    async query<T>(sql: string, params: unknown[] = []): Promise<T[]> {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows as T[]);
            });
        });
    }

    async run(sql: string, params: unknown[] = []): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }

    async get<T>(sql: string, params: unknown[] = []): Promise<T | undefined> {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, row) => {
                if (err) reject(err);
                else resolve(row as T);
            });
        });
    }
}
