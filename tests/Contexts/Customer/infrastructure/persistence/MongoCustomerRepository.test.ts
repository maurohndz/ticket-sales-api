import { MongoClientFactory } from '../../../../../src/Contexts/shared/infrastructure/persistence/mongo/MongoClientFactory';
import { MongoCustomerRepository } from '../../../../../src/Contexts/BoxOffice/Customer/infrastructure/persistence/MongoCustomerRepository';
import { MongoEnvironmentArranger } from '../../../shared/infrastructure/mongo/MongoEnvironmentArranger';
import { CustomerMother } from '../../domine/mother/CustomerMother';

const client = MongoClientFactory.createClient('BoxOffice', { url: 'mongodb://ticket_sales:Abc123456*@localhost:9002/' });
const repository = new MongoCustomerRepository(client);
const environmentArranger = new MongoEnvironmentArranger(client);

beforeEach(async () => {
    await (await environmentArranger).arrange();
});

afterAll(async () => {
    //await (await environmentArranger).arrange();
    await (await environmentArranger).close();
});

describe('CourseRepository', () => {
    describe('#save', () => {
      it('should save a course', async () => {
        const customer = CustomerMother.random();

        await repository.save(customer);
      });
    });
  });