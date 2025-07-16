import { v4 as uuidv4 } from 'uuid';
import { Customer } from "../../../../src/Contexts/BoxOffice/Customer/domain/Customer";

describe('[DOMINE] - Customer', () => {
    /**
     * Crear usuario con los datos requeridos
     */
    it('Crear usuario con los datos requeridos', () => {
        const customer = new Customer({
            id: uuidv4(),
            names: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            status: true,
        });

        expect(customer).toBeDefined();
        expect(customer.id).toBeDefined();
        expect(customer.names).toBe('John');
        expect(customer.lastName).toBe('Doe');
        expect(customer.email).toBe('john.doe@example.com');
    });

    it('Crear usuario con los todos los datos', () => {
        const customer = new Customer({
            id: uuidv4(),
            names: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            status: true,
        });

        expect(customer).toBeDefined();
        expect(customer.id).toBeDefined();
        expect(customer.names).toBe('John');
        expect(customer.lastName).toBe('Doe');
        expect(customer.email).toBe('john.doe@example.com');
        expect(customer.status).toBe(true);
    });
});