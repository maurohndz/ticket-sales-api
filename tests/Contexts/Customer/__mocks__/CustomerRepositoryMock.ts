import { Customer } from '../../../../src/Contexts/BoxOffice/Customer/domain/Customer';
import { CustomerRepository } from '../../../../src/Contexts/BoxOffice/Customer/domain/CustomerRepository';
import { Uuid } from '../../../../src/shared/domine/value-object/Uuid';

export class CustomerRepositoryMock implements CustomerRepository {
    private saveMock: jest.Mock;
    private customer: null|Customer;

    constructor() {
        this.saveMock = jest.fn();
        this.customer = null;
    }

    async save(customer: Customer): Promise<void> {
        this.saveMock(customer);
    }

    async search(id: Uuid): Promise<null | Customer> {
        return this.customer;
    }

    assertSaveHaveBeenCalledWith(customer: Customer) {
        expect(this.saveMock).toHaveBeenCalledWith(customer);
    }
}
