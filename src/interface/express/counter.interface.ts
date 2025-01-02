import Router from 'express';
import CounterService from '@/services/counter.service';
import CounterRepository from '@/repository/counter.repository';
import CounterController from '@/controllers/counter.controller';

const CounterInterface = Router();
CounterInterface.post('/increment/:id', (req, res, next) => {
    try {
        const service = new CounterService(new CounterRepository());
        const controller = new CounterController(service);
        const results = controller.count(req);
        res.status(200).json(results); 
    } catch (err) {
        next(err);
    }
});

export default CounterInterface;
