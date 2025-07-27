import { Uuid } from '../../../shared/domine/value-object/Uuid';
import { Email } from '../../../shared/domine/value-object/EmailValueObject';
import { Customer } from '../domain/Customer';
import { CustomerRepository } from '../domain/CustomerRepository'
import { LastNameValueObject } from '../domain/value-object/LastNameValueObject';
import { NamesValueObject } from '../domain/value-object/NamesValueObject';
import { CustomerCreatorRequest } from './CustomerCreatorRequest';

export class CustomerCreator {
    constructor(private readonly repository: CustomerRepository) {}

    async run(request: CustomerCreatorRequest) {
        const customer = new Customer(
            new Uuid(request.id),
            new NamesValueObject(request.names),
            new LastNameValueObject(request.lastName),
            new Email(request.email)
        );

        return this.repository.save(customer);
    }
}
