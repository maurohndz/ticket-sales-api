import { Exception } from "../../../../shared/domine/Exception";
import { StringValueObject } from "../../../../shared/domine/value-object/StringValueObject";

export class NamesValueObject extends StringValueObject {
    constructor(value: string) {
        super(value);

        this.ensureIsValidNames(value.trim());
    }

    private ensureIsValidNames(value: string): void {
        if (value.length > 30) throw new Exception(`<${this.constructor.name}> does not allow the value <${value}>`);
    }
}