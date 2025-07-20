import { FileCustomerRepository } from '../../../../../src/Contexts/BoxOffice/Customer/infrastructure/persistence/FileCustomerRepository';
import { CreateCustomerRequestMother } from '../../application/request-mother/CreateCourseRequestMother';
import { CustomerMother } from '../../domine/mother/CustomerMother';

describe('FileCustomerRepository', () => {
    it('Bebe guardar un cliente', async () => {
        const data = CreateCustomerRequestMother.ramdon();
        const expectedCustomer = CustomerMother.fromRequest(data);
        const repository = new FileCustomerRepository();

        await repository.save(expectedCustomer);

        const customer = await repository.search(expectedCustomer.id);

        expect(customer).toEqual(expectedCustomer);
    });
});