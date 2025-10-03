import { Uuid } from "../../../shared/domine/value-object/Uuid";
import { PasswordValueObject } from "../../../shared/domine/value-object/PasswordValueObject";
import { Customer } from "./Customer";

export class Credential {
    readonly _id: Uuid;
    private _password: PasswordValueObject;
    public customer?: Customer;

    constructor(id: Uuid, password: PasswordValueObject) {
        this._id = id;
        this._password = password;
    }

    get id(): Uuid {
        return this._id;
    }

    get password(): PasswordValueObject {
        return this._password;
    }
}