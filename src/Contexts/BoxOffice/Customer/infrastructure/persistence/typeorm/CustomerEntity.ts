import { EntitySchema } from 'typeorm';
import { Customer } from '../../../domain/Customer';
import { ValueObjectTransformer } from '../../../../../shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { Uuid } from '../../../../../shared/domine/value-object/Uuid'
import { Email } from '../../../../../shared/domine/value-object/EmailValueObject'
import { NamesValueObject } from '../../../domain/value-object/NamesValueObject'
import { LastNameValueObject } from '../../../domain/value-object/LastNameValueObject'

export const CustomerEntity = new EntitySchema<Customer>({
    name: 'Customer',
    tableName: 'customers',
    schema: 'main',
    target: Customer,
    columns: {
        id: {
            type: String,
            primary: true,
            transformer: ValueObjectTransformer(Uuid)
        },
        names: {
            type: String,
            transformer: ValueObjectTransformer(NamesValueObject)
        },
        last_name: {
            type: String,
            transformer: ValueObjectTransformer(LastNameValueObject)
        },
        email: {
            type: String,
            transformer: ValueObjectTransformer(Email)
        }
    }
});
