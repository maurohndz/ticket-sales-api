import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { IController } from './IController';

export default class StatusGetController implements IController {
    constructor() {}

    async run(req: Request, res: Response) {
        res.status(httpStatus.OK).send('RUN !!!.');
    }
}
