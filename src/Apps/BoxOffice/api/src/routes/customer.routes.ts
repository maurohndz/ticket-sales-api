import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { CustomerPutController } from '../controllers/CustomerPutController';
import { CustomerCreator } from '../../../../../Contexts/BoxOffice/Customer/application/CustomerCreator';
//import { FileCustomerRepository } from '../../../../../Contexts/BoxOffice/Customer/infrastructure/persistence/FileCustomerRepository';
//import { MongoCustomerRepository } from '../../../../../Contexts/BoxOffice/Customer/infrastructure/persistence/MongoCustomerRepository';
import { validateReqSchema } from '../routes/validations';
import { TypeOrmClientFactory } from '../../../../../Contexts/shared/infrastructure/persistence/typeorm/TypeOrmClientFactory';
import { TypeOrmCustomerRepository } from '../../../../../Contexts/BoxOffice/Customer/infrastructure/persistence/TypeOrmCustomerRepository';
//import { MongoClientFactory } from '../../../../../Contexts/shared/infrastructure/persistence/mongo/MongoClientFactory';

export const signUp = (router: Router) => {
    const reqSchema = [
        body('id').exists().isString(),
        body('names').exists().isString(),
        body('lastName').exists().isString(),
        body('email').exists().isString(),
    ];

    /*const client = MongoClientFactory.createClient('BoxOffice', { url: 'mongodb://root:example@localhost:27017' });
    const repository = new MongoCustomerRepository(client);*/
    const client = TypeOrmClientFactory.createDataSource('BoxOffice', {
        host: 'localhost',
        port: 9001,
        password: 'Abc123456*',
        username: 'ticket_sales',
        type: 'postgres',
        database: 'box-office',
        synchronize: false
    });
    const repository = new TypeOrmCustomerRepository(client);

    const customerCreator = new CustomerCreator(repository);
    const controller = new CustomerPutController(customerCreator);

    router.put('/customer/:id', reqSchema, validateReqSchema, (req: Request, res: Response) => controller.run(req, res));
};