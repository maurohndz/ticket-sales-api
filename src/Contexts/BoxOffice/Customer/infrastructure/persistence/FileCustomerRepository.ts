import fs from 'fs';
import { serialize, deserialize } from 'bson';
import { CustomerRepository } from '../../domain/CustomerRepository';
import { Customer } from '../../domain/Customer';
import { Uuid } from '../../../../../shared/domine/value-object/Uuid';

export class FileCustomerRepository implements CustomerRepository {
    private FILE_PATH = `${__dirname}/customer`;

    async save(customer: Customer): Promise<void> {
        const customerData = customer.toPrimitives();
        await fs.promises.writeFile(this.filePath(customer.id.getValue()), serialize(customerData));
    }

    async search(customerId: string): Promise<Customer> {
        const customerData = await fs.promises.readFile(this.filePath(customerId));
        const customerPrimitives = deserialize(customerData);

        return new Customer(
            new Uuid(customerPrimitives.id),
            customerPrimitives.names,
            customerPrimitives.lastName,
            customerPrimitives.email,
            customerPrimitives.status
        );
    }

    private filePath(id: string): string {
        return `${this.FILE_PATH}.${id}.repo`;
    }
}