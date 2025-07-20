import { CustomerRepositoryMock } from '../__mocks__/CustomerRepositoryMock';
import { CustomerCreator } from '../../../../src/Contexts/BoxOffice/Customer/application/CustomerCreator';
import { CreateCustomerRequestMother } from './request-mother/CreateCourseRequestMother';
import { CustomerMother } from '../domine/mother/CustomerMother';

describe('CustomerCreator', () => {
    let repository: CustomerRepositoryMock;

    beforeEach(() => {
        repository = new CustomerRepositoryMock();
    });

    it('Debe crear un cliente válido', async () => {
        const request = CreateCustomerRequestMother.ramdon();
        const customer = CustomerMother.fromRequest(request);
        const creator = new CustomerCreator(repository);

        await creator.run(request);

        repository.assertSaveHaveBeenCalledWith(customer);
    });
});