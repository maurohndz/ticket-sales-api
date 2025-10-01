import { Router, Request, Response } from 'express';
import StatusGetController from '../controllers/StatusGetController';
import container from '../dependency-injection';

export const status = (router: Router) => {
    const controller = container.get<StatusGetController>('StatusGetController');

    router.get('/status', (req: Request, res: Response) => controller.run(req, res));
};