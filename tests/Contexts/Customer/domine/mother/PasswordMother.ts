import { PasswordValueObject } from "../../../../../src/Contexts/shared/domine/value-object/PasswordValueObject";
import { MotherCreator } from "../../../shared/domine/MotherCreator";

export class PasswordMother {
    static create(value: string): PasswordValueObject {
        return new PasswordValueObject(value);
    }

    static random() {
        return this.create(MotherCreator.random().string.alpha({ length: 30 }));
    }
}