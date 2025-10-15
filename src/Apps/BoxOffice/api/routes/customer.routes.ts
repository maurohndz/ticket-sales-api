import { check, body } from 'express-validator';
import { Router, Request, Response } from 'express';
import container from '../dependency-injection';
import { CustomerGetController } from '../controllers/Customers/CustomerGetController';
import { CustomerPutController } from '../controllers/Customers/CustomerPutController';
import { validateReqSchema } from '../middlewares/ValidationsMiddelware';

export const getById = (router: Router) => {
    const reqSchema = [
        check('id').exists().isString().isUUID(),
    ];

    const controller = container.get<CustomerGetController>('App.BoxOffice.Api.CustomerGetController');
    router.get('/customer/:id', reqSchema, validateReqSchema, (req: Request, res: Response) => controller.run(req, res));
}

/**
 * Customer Registration
 */
export const signUp = (router: Router) => {
    const reqSchema = [
        body('id').exists().isString(),
        body('names').exists().isString(),
        body('last_name').exists().isString(),
        body('email').exists().isString(),
    ];

    const controller = container.get<CustomerPutController>('App.BoxOffice.Api.CustomerPutController');
    router.put('/customer/:id', reqSchema, validateReqSchema, (req: Request, res: Response) => controller.run(req, res));
};