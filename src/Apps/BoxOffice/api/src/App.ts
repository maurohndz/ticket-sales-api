import express from 'express';
import bodyParser from 'body-parser';
import { registerRoutes } from './routes/index';
import { ErrorHandlerMiddleware } from './middlewares/ErrorHandlerMiddelware';

export const createApp = async () => {
    const app = express();

    app.set('env', process.env.ENVIRONMENT);
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

    // Registrar las rutas
    registerRoutes(app);

    // Middleware de manejo de errores
    app.use(ErrorHandlerMiddleware.handle);

    return app;
};