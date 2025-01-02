/**
 * SQLite Implementation
 * 
 */

import sqlite3 from 'sqlite3';
import { Database as sqlite } from 'sqlite3';

export default class Database {
    private static db: sqlite;
    public static isInitialized: Boolean = false;
    constructor () {}
    
    static async initialize (): Promise<void> {
        if (Database.isInitialized) return;
        return new Promise((resolve, reject) => {
            Database.db = new sqlite3.Database(':memory:', (err) => {
                if (err) reject(err);
                Database.isInitialized = true;
                resolve();
            });
        });
    }

    async query<T>(sql: string, params: unknown[] = []): Promise<T[]> {
        if (!Database.isInitialized) throw new Error('Database down!');
        return new Promise((resolve, reject) => {
            Database.db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows as T[]);
            });
        });
    }

    async run(sql: string, params: unknown[] = []): Promise<void> {
        if (!Database.isInitialized) throw new Error('Database down!');
        return new Promise((resolve, reject) => {
            Database.db.run(sql, params, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }

    async get<T>(sql: string, params: unknown[] = []): Promise<T | undefined> {
        if (!Database.isInitialized) throw new Error('Database down!');
        return new Promise((resolve, reject) => {
            Database.db.get(sql, params, (err, row) => {
                if (err) reject(err);
                else resolve(row as T);
            });
        });
    }
}
