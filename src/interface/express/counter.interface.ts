import Router from 'express';
import { asyncHandler } from '@/utils/server.util';
import CounterController from '@/controllers/counter.controller';

const CounterInterface = Router();
const controller = new CounterController();

CounterInterface.post('/increment/:id', asyncHandler((req, res) => {
    const results = controller.count(req);
    res.status(200).json(results); 
}));

export default CounterInterface;
