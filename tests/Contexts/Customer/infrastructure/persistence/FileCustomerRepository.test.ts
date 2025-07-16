import { Customer } from '../../../../../src/Contexts/BoxOffice/Customer/domain/Customer';
import { FileCustomerRepository } from '../../../../../src/Contexts/BoxOffice/Customer/infrastructure/persistence/FileCustomerRepository';

describe('FileCustomerRepository', () => {
    it('Bebe guardar un cliente', async () => {
        const id = 'id';
        const names = 'names';
        const lastName = 'lastNames';
        const email = 'email@email.com';
        const expectedCustomer = new Customer({ id, names, lastName, email });
        const repository = new FileCustomerRepository();

        await repository.save(expectedCustomer);

        const customer = await repository.search(id);

        expect(customer).toEqual(expectedCustomer);
    });
});