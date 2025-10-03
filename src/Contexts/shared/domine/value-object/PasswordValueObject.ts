import { PasswordHasher } from '../security/PasswordHasher';
import { StringValueObject } from './StringValueObject';

export class PasswordValueObject extends StringValueObject {
    constructor(value: string) {
        super(value);
    }

    static async fromPlain(plain: string, hasher: PasswordHasher): Promise<PasswordValueObject> {
        const hashed = await hasher.hash(plain);
        return new PasswordValueObject(hashed);
    }

    static fromHashed(hashed: string): PasswordValueObject {
        return new PasswordValueObject(hashed);
    }

    async matches(plain: string, hasher: PasswordHasher): Promise<boolean> {
        return hasher.compare(plain, this.value);
    }
}
