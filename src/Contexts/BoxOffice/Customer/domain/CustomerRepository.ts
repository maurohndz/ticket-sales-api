import { Uuid } from '../../../shared/domine/value-object/Uuid';
import { Customer } from './Customer';
import { CustomerSearchParams } from './CustomerTypes';

export interface CustomerRepository {
    save(customer: Customer): Promise<void>;
    search(params: CustomerSearchParams): Promise<null|Customer>;
    find(id: Uuid): Promise<null|Customer>;
}