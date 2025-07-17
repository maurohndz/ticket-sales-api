import { Uuid } from '../../../../shared/domine/value-object/Uuid';
import { Customer } from '../domain/Customer';
import { CustomerRepository } from '../domain/CustomerRepository'
import { CustomerCreatorRequest } from './CustomerCreatorRequest';

export class CustomerCreator {
    constructor(private readonly repository: CustomerRepository) {}

    async run(request: CustomerCreatorRequest) {
        const customer = new Customer(
            new Uuid(request.id),
            request.names,
            request.lastName,
            request.email
        );

        return this.repository.save(customer);
    }
}
