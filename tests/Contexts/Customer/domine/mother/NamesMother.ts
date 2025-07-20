import { NamesValueObject } from "../../../../../src/Contexts/BoxOffice/Customer/domain/value-object/NamesValueObject";
import { MotherCreator } from "../../../shared/domine/MotherCreator";


export class NamesMother {
    static create(value: string): NamesValueObject {
        return new NamesValueObject(value);
    }

    static random() {
        return this.create(MotherCreator.random().string.alpha({ length: 30 }));
    }
}