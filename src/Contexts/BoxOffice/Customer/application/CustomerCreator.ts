import { Customer } from '../domain/Customer';
import { CustomerRepository } from '../domain/CustomerRepository'

interface CreateCustomerDTO {
    id: string;
    names: string;
    lastName: string;
    email: string;
}

export class CustomerCreator {
    constructor(private repository: CustomerRepository) {}

    async run(data: CreateCustomerDTO) {
        const customer = new Customer(data);

        return this.repository.save(customer);
    }
}
