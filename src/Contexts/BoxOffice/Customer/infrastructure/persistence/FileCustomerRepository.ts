import fs from 'fs';
import { serialize, deserialize } from 'bson';
import { CustomerRepository } from '../../domain/CustomerRepository';
import { Customer } from '../../domain/Customer';
import { Uuid } from '../../../../../shared/domine/value-object/Uuid';
import { NamesValueObject } from '../../domain/value-object/NamesValueObject';
import { LastNameValueObject } from '../../domain/value-object/LastNameValueObject';
import { Email } from '../../../../../shared/domine/value-object/EmailValueObject';

export class FileCustomerRepository implements CustomerRepository {
    private FILE_PATH = `${__dirname}/customer`;

    async save(customer: Customer): Promise<void> {
        const customerData = customer.toPrimitives();
        await fs.promises.writeFile(this.filePath(customer.id.value), serialize(customerData));
    }

    async search(id: Uuid): Promise<Customer> {
        const customerData = await fs.promises.readFile(this.filePath(id.value));
        const customerPrimitives = deserialize(customerData);

        return new Customer({
            id: new Uuid(customerPrimitives.id),
            names: new NamesValueObject(customerPrimitives.names),
            lastName: new LastNameValueObject(customerPrimitives.lastName),
            email: new Email(customerPrimitives.email),
        });
    }

    private filePath(id: string): string {
        return `${this.FILE_PATH}.${id}.repo`;
    }
}