import { EntitySchema } from 'typeorm';
import { ValueObjectTransformer } from '../../../../../shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { Uuid } from '../../../../../shared/domine/value-object/Uuid'
import { Credential } from '../../../domain/Credential';
import { PasswordValueObject } from '../../../../../shared/domine/value-object/PasswordValueObject';

export const CredentialEntity = new EntitySchema<Credential>({
    name: 'Credential',
    tableName: 'credentials',
    schema: 'security',
    target: Credential,
    columns: {
        id: {
            type: String,
            primary: true,
            transformer: ValueObjectTransformer(Uuid)
        },
        password: {
            type: String,
            transformer: ValueObjectTransformer(PasswordValueObject)
        }
    }
});
