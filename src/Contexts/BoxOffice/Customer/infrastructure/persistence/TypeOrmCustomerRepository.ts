import { EntitySchema } from 'typeorm';
import { Customer } from "../../domain/Customer";
import { CustomerRepository } from "../../domain/CustomerRepository";
import { CustomerEntity } from './typeorm/CustomerEntity';
import { TypeOrmRepository } from '../../../../shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { Uuid } from '../../../../shared/domine/value-object/Uuid';
import { CustomerSearchParams } from '../../domain/CustomerTypes';
export class TypeOrmCustomerRepository extends TypeOrmRepository<Customer> implements CustomerRepository {
    public async save(customer: Customer): Promise<void> {
        return this.persist(customer);
    }

    public async find(id: Uuid): Promise<null|Customer> {
        const repository = await this.repository();
        const customer = await repository.findOne({ where: { id: id.value } });

        return customer;
    }

    public async search(params: CustomerSearchParams): Promise<null|Customer> {
        const repository = await this.repository();
        const customer = await repository.findOne({ where: params });

        return customer;
    }

    protected entitySchema(): EntitySchema<Customer> {
        return CustomerEntity;
    }
}