import { MongoClientFactory } from '../../../../../src/shared/infrastructure/persistence/mongo/MongoClientFactory';
import { MongoCustomerRepository } from '../../../../../src/Contexts/BoxOffice/Customer/infrastructure/persistence/MongoCustomerRepository';
import { MongoEnvironmentArranger } from '../../../shared/infrastructure/mongo/MongoEnvironmentArranger';
import { CustomerMother } from '../../domine/mother/CustomerMother';

const client = MongoClientFactory.createClient('BoxOffice', { url: 'mongodb://root:example@localhost:27017/' });
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