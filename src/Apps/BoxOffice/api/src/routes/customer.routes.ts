import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { CustomerPutController } from '../controllers/CustomerPutController';
import { CustomerCreator } from '../../../../../Contexts/BoxOffice/Customer/application/CustomerCreator';
import { FileCustomerRepository } from '../../../../../Contexts/BoxOffice/Customer/infrastructure/persistence/FileCustomerRepository';
import { validateReqSchema } from '../routes/validations';

export const signUp = (router: Router) => {
    const reqSchema = [
        body('id').exists().isString(),
        body('names').exists().isString(),
        body('lastName').exists().isString(),
        body('email').exists().isString(),
    ];

    const repository = new FileCustomerRepository();
    const customerCreator = new CustomerCreator(repository);
    const controller = new CustomerPutController(customerCreator);

    router.put('/customer/:id', reqSchema, validateReqSchema, (req: Request, res: Response) => controller.run(req, res));
};