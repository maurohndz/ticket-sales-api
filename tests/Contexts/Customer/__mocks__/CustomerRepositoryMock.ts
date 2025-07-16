import { Customer } from '../../../../src/Contexts/BoxOffice/Customer/domain/Customer';
import { CustomerRepository } from '../../../../src/Contexts/BoxOffice/Customer/domain/CustomerRepository';

export class CustomerRepositoryMock implements CustomerRepository {
    private saveMock: jest.Mock;

    constructor() {
        this.saveMock = jest.fn();
    }

    async save(customer: Customer): Promise<void> {
        this.saveMock(customer);
    }

    assertSaveHaveBeenCalledWith(customer: Customer) {
        expect(this.saveMock).toHaveBeenCalledWith(customer);
    }
}
