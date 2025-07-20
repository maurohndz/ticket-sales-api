import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { CustomerPutController } from '../controllers/CustomerPutController';
import { CustomerCreator } from '../../../../../Contexts/BoxOffice/Customer/application/CustomerCreator';
//import { FileCustomerRepository } from '../../../../../Contexts/BoxOffice/Customer/infrastructure/persistence/FileCustomerRepository';
import { MongoCustomerRepository } from '../../../../../Contexts/BoxOffice/Customer/infrastructure/persistence/MongoCustomerRepository';
import { validateReqSchema } from '../routes/validations';
import { MongoClientFactory } from '../../../../../shared/infrastructure/persistence/mongo/MongoClientFactory';

export const signUp = (router: Router) => {
    const reqSchema = [
        body('id').exists().isString(),
        body('names').exists().isString(),
        body('lastName').exists().isString(),
        body('email').exists().isString(),
    ];

    const client = MongoClientFactory.createClient('BoxOffice', { url: 'mongodb://root:example@localhost:27017/ts-bo' });
    const repository = new MongoCustomerRepository(client);
    const customerCreator = new CustomerCreator(repository);
    const controller = new CustomerPutController(customerCreator);

    router.put('/customer/:id', reqSchema, validateReqSchema, (req: Request, res: Response) => controller.run(req, res));
};