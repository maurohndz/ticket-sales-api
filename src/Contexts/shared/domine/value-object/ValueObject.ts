export type Primitives = String | string | number | Boolean | boolean | Date;

export abstract class ValueObject<T extends Primitives> {
    readonly value: T;

    constructor(value: T) {
        this.value = value;
    }

    toString(): string {
        return this.value.toString()
    }
}