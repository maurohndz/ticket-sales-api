import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { Controller } from './Controller';
import { CustomerCreator } from '../../../../../Contexts/BoxOffice/Customer/application/CustomerCreator';

export class CustomerPutController implements Controller {
    constructor(private customerCreator: CustomerCreator) {}

    async run(req: Request, res: Response) {
        const {id, names, lastName, email} = req.body;

        await this.customerCreator.run({ id, names, lastName, email });

        res.status(httpStatus.CREATED).send();
    }
}