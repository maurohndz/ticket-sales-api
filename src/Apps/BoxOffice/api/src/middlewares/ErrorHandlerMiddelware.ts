// ErrorHandlerMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { Exception } from '../../../../../shared/domine/Exception';

export class ErrorHandlerMiddleware {
    static handle(error: Error, req: Request, res: Response, next: NextFunction): void {
        console.error('Error:', error.message);

        let status = 500;
        let message = 'Error interno del servidor';

        // Captura tu Exception personalizada
        if (error instanceof Exception) {
            status = 400;
            message = error.message;
        }

        res.status(status).json({
            status,
            message,
            timestamp: new Date().toISOString(),
            path: req.path
        });
    }
}