import { Uuid } from '../../../../shared/domine/value-object/Uuid';
import { Customer } from '../domain/Customer';
import { CustomerRepository } from '../domain/CustomerRepository'
import { LastNameValueObject } from '../domain/value-object/LastNameValueObject';
import { NamesValueObject } from '../domain/value-object/NamesValueObject';
import { CustomerCreatorRequest } from './CustomerCreatorRequest';

export class CustomerCreator {
    constructor(private readonly repository: CustomerRepository) {}

    async run(request: CustomerCreatorRequest) {
        const customer = new Customer({
            id: new Uuid(request.id),
            names: new NamesValueObject(request.names),
            lastName: new LastNameValueObject(request.lastName),
            email: request.email
        });

        return this.repository.save(customer);
    }
}
