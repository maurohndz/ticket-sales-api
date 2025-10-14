import { Email } from "../../../shared/domine/value-object/EmailValueObject";
import { LastNameValueObject } from "./value-object/LastNameValueObject";
import { NamesValueObject } from "./value-object/NamesValueObject";

export type CustomerSearchParams = Partial<{
    names: NamesValueObject;
    last_name: LastNameValueObject;
    email: Email;
}>;
