import { v4 as uuidv4 } from 'uuid';
import { Customer } from "../../../../src/Contexts/BoxOffice/Customer/domain/Customer";
import { Uuid } from '../../../../src/shared/domine/value-object/Uuid';

describe('[DOMINE] - Customer', () => {
    /**
     * Crear usuario con los datos requeridos
     */
    it('Crear usuario con los datos requeridos', () => {
        const customer = new Customer(
            new Uuid(uuidv4()),
            'John',
            'Doe',
            'john.doe@example.com',
            true,
        );

        expect(customer).toBeDefined();
        expect(customer.id).toBeDefined();
        expect(customer.names).toBe('John');
        expect(customer.lastName).toBe('Doe');
        expect(customer.email).toBe('john.doe@example.com');
    });
});