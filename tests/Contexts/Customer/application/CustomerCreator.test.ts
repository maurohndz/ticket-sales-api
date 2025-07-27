import { CustomerRepositoryMock } from '../__mocks__/CustomerRepositoryMock';
import { CustomerCreator } from '../../../../src/Contexts/BoxOffice/Customer/application/CustomerCreator';
import { CreateCustomerRequestMother } from './request-mother/CreateCourseRequestMother';
import { CustomerMother } from '../domine/mother/CustomerMother';
import { Exception } from '../../../../src/Contexts/shared/domine/Exception';

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

    it('Debe dar error si excede la longitud permitida del nombre del cliente', async () => {
        const request = CreateCustomerRequestMother.invalidRequest();
        const creator = new CustomerCreator(repository);

        await expect(creator.run(request)).rejects.toThrow(Exception);
    });
});