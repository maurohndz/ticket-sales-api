import validate from 'uuid-validate';
import { v4 as uuid } from 'uuid';
import { Exception } from '../Exception';
import { ValueObject } from './ValueObject';

export class Uuid extends ValueObject<string> {
    constructor(value: string) {
        super(value);

        this.ensureIsValidUuid(value);
    }

    static random(): string {
        return uuid();
    }

    private ensureIsValidUuid(id: string): void {
        if (!validate(id)) {
            throw new Exception(`<${this.constructor.name}> does not allow the value <${id}>`);
        }
    }
}