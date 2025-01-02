import Router from 'express';
import { asyncHandler } from '@/utils/server.util';
import {db} from '@/database/index';
import CounterService from '@/services/counter.service';
import CounterRepository from '@/repository/counter.repository';
import CounterController from '@/controllers/counter.controller';

const CounterInterface = Router();
CounterInterface.post('/increment/:id', asyncHandler((req, res) => {
    const service = new CounterService(new CounterRepository(db.getDatabase()));
    const controller = new CounterController(service);
    const results = controller.count(req);
    res.status(200).json(results); 
}));

export default CounterInterface;
