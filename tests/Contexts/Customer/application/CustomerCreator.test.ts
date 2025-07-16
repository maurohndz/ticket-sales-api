import { CustomerRepositoryMock } from '../__mocks__/CustomerRepositoryMock';
import { Customer } from '../../../../src/Contexts/BoxOffice/Customer/domain/Customer';
import { CustomerCreator } from '../../../../src/Contexts/BoxOffice/Customer/application/CustomerCreator';

describe('CustomerCreator', () => {
    let repository: CustomerRepositoryMock;

    beforeEach(() => {
        repository = new CustomerRepositoryMock();
    });

    it('Debe crear un cliente', async () => {
        const creator = new CustomerCreator(repository);
        const id = 'id';
        const names = 'names';
        const lastName = 'lastNames';
        const email = 'email@email.com';
        const expectedCustomer = new Customer({ id, names, lastName, email });

        await creator.run({ id, names, lastName, email });

        repository.assertSaveHaveBeenCalledWith(expectedCustomer);
    });
});