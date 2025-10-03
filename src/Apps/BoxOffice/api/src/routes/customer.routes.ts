import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { CustomerPutController } from '../controllers/CustomerPutController';
//import { FileCustomerRepository } from '../../../../../Contexts/BoxOffice/Customer/infrastructure/persistence/FileCustomerRepository';
//import { MongoCustomerRepository } from '../../../../../Contexts/BoxOffice/Customer/infrastructure/persistence/MongoCustomerRepository';
import { validateReqSchema } from '../routes/validations';
import container from '../../di';
//import { MongoClientFactory } from '../../../../../Contexts/shared/infrastructure/persistence/mongo/MongoClientFactory';

export const signUp = (router: Router) => {
    const reqSchema = [
        body('id').exists().isString(),
        body('names').exists().isString(),
        body('last_name').exists().isString(),
        body('email').exists().isString(),
        body('password').exists().isString(),
    ];

    /*const client = MongoClientFactory.createClient('BoxOffice', { url: 'mongodb://root:example@localhost:27017' });
    const repository = new MongoCustomerRepository(client);*/

    const controller = container.get<CustomerPutController>('App.BoxOffice.Api.CustomerPutController');

    router.put('/customer/:id', reqSchema, validateReqSchema, (req: Request, res: Response) => controller.run(req, res));
};