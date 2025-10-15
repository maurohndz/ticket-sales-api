import { Router } from 'express';
import { status as appStatus } from './status.routes';
import {
    signUp as customerSignUp,
    getById as customerGetById,
} from './customer.routes';

export function registerRoutes(router: Router) {
    appStatus(router);

    customerGetById(router);
    customerSignUp(router);
}
