import { Email } from "../../../../../src/shared/domine/value-object/EmailValueObject";
import { MotherCreator } from "../../../shared/domine/MotherCreator";

export class EmailMother {
    static create(value: string): Email {
        return new Email(value);
    }

    static random() {
        return this.create(MotherCreator.random().string.alpha({ length: 30 }));
    }
}