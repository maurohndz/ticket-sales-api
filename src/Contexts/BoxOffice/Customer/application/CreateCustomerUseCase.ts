import { ICustomerRepository } from '../domain/ICustomer.js';
import { Customer } from '../domain/Customer.js';

interface CreateCustomerDTO {
    names: string;
    lastName: string;
    email: string;
}

export class CreateCustomerUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(data: CreateCustomerDTO): Promise<Customer> {
    const customer = new Customer({
        names: data.names,
        lastName: data.lastName,
        email: data.email
    });

    // 3. Guardar en el repositorio
    await this.customerRepository.save(customer);

    // 4. Retornar el cliente creado
    return customer;
  }
}
