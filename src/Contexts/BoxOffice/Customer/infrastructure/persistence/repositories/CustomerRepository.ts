import { ModelStatic, Transaction } from 'sequelize';
import { Customer } from '../../../domain/Customer.js';
import { ICustomerRepository } from '../../../domain/ICustomer.js';
import { BaseRepository } from '../../../../../../shared/base/BaseRepository.js';
import { customer } from '../../../../shared/infrastructure/persistence/postgresql/models/customer.js';

export class CustomerRepositoryImpl extends BaseRepository<customer> implements ICustomerRepository {
  constructor(model: ModelStatic<customer>) {
    super({ model });
  }

  async save(customer: Customer, transaction: Transaction): Promise<Customer> {
    const primitives = customer.toPrimitives();

    const createdCustomer = await this.store({ payload: primitives }, transaction);

    return this.mapToDomain(createdCustomer);
  }

  /**
   * Mapea un registro de la base de datos al dominio Customer
   * @param customerRecord - Registro de la base de datos
   * @returns Instancia del dominio Customer
   */
  private mapToDomain(customerRecord: customer): Customer {
    return new Customer({
        id: customerRecord.id,
        names: customerRecord.names,
        lastName: customerRecord.last_name,
        email: customerRecord.email,
        status: customerRecord.status,
        createdAt: customerRecord.created_at,
        updatedAt: customerRecord.updated_at,
        deletedAt: customerRecord.deleted_at
    });
  }
}
