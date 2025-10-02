import { Router } from 'express';
import { status as appStatus } from './status.routes';
import { signUp as customerSignUp } from './customer.routes';

export function registerRoutes(router: Router) {
    appStatus(router);
    customerSignUp(router);
}
