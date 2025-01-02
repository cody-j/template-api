import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import logger from '@/utils/logger.util';

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

app.get('/health', (req, res) => {
    res.status(200).json('ok');
});
// app.use('/api', routes);

export default app;
