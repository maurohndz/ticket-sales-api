import { Uuid } from "../../../../../src/shared/domine/value-object/Uuid";

export class IdMother {
    static create(value: string): Uuid {
        return new Uuid(value);
    }

    static random() {
        return this.create(Uuid.random());
    }
}