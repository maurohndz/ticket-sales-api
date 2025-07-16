import { Router } from 'express';
import { signUp as customerSignUp } from './customer.routes';

export function registerRoutes(router: Router) {
    customerSignUp(router);
}
