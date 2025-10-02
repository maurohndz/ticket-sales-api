import { EntitySchema } from 'typeorm';
import { Customer } from "../../domain/Customer";
import { CustomerRepository } from "../../domain/CustomerRepository";
import { CustomerEntity } from './typeorm/CustomerEntity';
import { TypeOrmRepository } from '../../../../shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { Uuid } from '../../../../shared/domine/value-object/Uuid';

export class TypeOrmCustomerRepository extends TypeOrmRepository<Customer> implements CustomerRepository {
    public async save(customer: Customer): Promise<void> {
        return this.persist(customer);
    }

    public async search(id: Uuid): Promise<null|Customer> {
        const repository = await this.repository();
        const course = await repository.findOne({ where: { id } });

        return course;
    }

    protected entitySchema(): EntitySchema<Customer> {
        return CustomerEntity;
    }
}