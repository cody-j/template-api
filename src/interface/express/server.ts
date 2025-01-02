import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import logger from '@/utils/logger.util';
import counter from './counter.interface';
import { Controller } from '@/controllers';
import CounterController from '@/controllers/counter.controller';
import Database from '@/database';


class AppBuilder {
    private controllers: {path: string, controller: Controller}[] = [];
    
    registerController (path: string, controller: Controller) {
        this.controllers.push({ path, controller });
        return this;
    }

    build (): Application {
        const app = express();

        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({extended:true}));
        app.use(logger);
        app.use(helmet({
            noSniff: true,
            crossOriginResourcePolicy: {
                policy: 'same-site',
            },
            hsts: false, // strict https off in development
        }));

        app.use('/counter', counter);

        app.get('/health', (req, res) => {
            res.status(200).json('ok');
        });

        return app;
    }
}

export function createApp (db: Database) {
    const count = new CounterController(db);
    return new AppBuilder()
        .registerController('/count', count)
        .build();
};
