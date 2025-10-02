import { LastNameValueObject } from "../../../../../src/Contexts/BoxOffice/Customer/domain/value-object/LastNameValueObject";
import { MotherCreator } from "../../../shared/domine/MotherCreator";

export class LastNameMother {
    static create(value: string): LastNameValueObject {
        return new LastNameValueObject(value);
    }

    static random() {
        return this.create(MotherCreator.random().string.alpha({ length: 30 }));
    }
}