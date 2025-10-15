import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { CustomerViewer } from '../../../../../Contexts/BoxOffice/Customer/application/CustomerViewer';
import { IController } from '../IController';

export class CustomerGetController implements IController {
    constructor(private customerViewer: CustomerViewer) {}

    async run(req: Request, res: Response) {
        const payload = await this.customerViewer.run(req.params.id);

        res.status(httpStatus.OK).send({
            code: httpStatus.OK,
            data: payload,
        });
    }
}