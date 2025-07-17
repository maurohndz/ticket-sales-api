import { v4 as uuidv4 } from 'uuid';
import { CustomerRepositoryMock } from '../__mocks__/CustomerRepositoryMock';
import { Customer } from '../../../../src/Contexts/BoxOffice/Customer/domain/Customer';
import { CustomerCreator } from '../../../../src/Contexts/BoxOffice/Customer/application/CustomerCreator';
import { Uuid } from '../../../../src/shared/domine/value-object/Uuid';

describe('CustomerCreator', () => {
    let repository: CustomerRepositoryMock;

    beforeEach(() => {
        repository = new CustomerRepositoryMock();
    });

    it('Debe crear un cliente', async () => {
        const creator = new CustomerCreator(repository);
        const id = uuidv4();
        const names = 'names';
        const lastName = 'lastNames';
        const email = 'email@email.com';
        const expectedCustomer = new Customer(new Uuid(id), names, lastName, email);

        await creator.run({ id, names, lastName, email });

        repository.assertSaveHaveBeenCalledWith(expectedCustomer);
    });
});