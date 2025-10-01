import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { Controller } from './Controller';

export default class StatusGetController implements Controller {
    constructor() {}

    async run(req: Request, res: Response) {
        res.status(httpStatus.OK).send('RUN !!!.');
    }
}
