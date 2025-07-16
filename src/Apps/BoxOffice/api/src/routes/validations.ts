import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { validationResult, ValidationError } from 'express-validator';

export function validateReqSchema(req: Request, res: Response, next: Function) {
    const validationErrors = validationResult(req);
    if (validationErrors.isEmpty()) {
        return next();
    }
    const errors = validationErrors.array().map((err: ValidationError) => ({ [err.type]: err.msg }));

    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        errors
    });
}