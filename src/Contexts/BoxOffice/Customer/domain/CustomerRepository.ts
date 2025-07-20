import { Uuid } from '../../../../shared/domine/value-object/Uuid';
import { Customer } from './Customer';

export interface CustomerRepository {
    save(customer: Customer): Promise<void>;
    search(id: Uuid): Promise<null|Customer>;
}