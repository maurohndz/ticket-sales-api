import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { CustomerViewer } from "../../../../../Contexts/BoxOffice/Customer/application/CustomerViewer";
import { Controller } from "./Controller";

export class CustomerGetController implements Controller {
    constructor(private customerViewer: CustomerViewer) {}

    async run(req: Request, res: Response) {
        const payload = await this.customerViewer.run(req.params.id);

        res.status(httpStatus.OK).send({
            code: httpStatus.OK,
            data: payload,
        });
    }
}