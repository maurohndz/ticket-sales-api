import { v4 as uuidv4 } from 'uuid';
import { Customer } from '../../../../../src/Contexts/BoxOffice/Customer/domain/Customer';
import { FileCustomerRepository } from '../../../../../src/Contexts/BoxOffice/Customer/infrastructure/persistence/FileCustomerRepository';
import { Uuid } from '../../../../../src/shared/domine/value-object/Uuid';

describe('FileCustomerRepository', () => {
    it('Bebe guardar un cliente', async () => {
        const id = uuidv4();
        const names = 'names';
        const lastName = 'lastNames';
        const email = 'email@email.com';
        const expectedCustomer = new Customer(new Uuid(id), names, lastName, email);
        const repository = new FileCustomerRepository();

        await repository.save(expectedCustomer);

        const customer = await repository.search(id);

        expect(customer).toEqual(expectedCustomer);
    });
});