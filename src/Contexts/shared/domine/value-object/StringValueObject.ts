import { ValueObject } from './ValueObject';

export abstract class StringValueObject extends ValueObject<string> {
    constructor(v: string ) {
        super(v.trim());
    }
}
