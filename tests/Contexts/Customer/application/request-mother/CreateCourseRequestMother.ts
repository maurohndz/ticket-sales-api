import { CustomerCreatorRequest } from "../../../../../src/Contexts/BoxOffice/Customer/application/CustomerCreatorRequest";
import { LastNameValueObject } from "../../../../../src/Contexts/BoxOffice/Customer/domain/value-object/LastNameValueObject";
import { NamesValueObject } from "../../../../../src/Contexts/BoxOffice/Customer/domain/value-object/NamesValueObject";
import { Uuid } from "../../../../../src/Contexts/shared/domine/value-object/Uuid";
import { Email } from "../../../../../src/Contexts/shared/domine/value-object/EmailValueObject";
import { EmailMother } from "../../domine/mother/EmailMother";
import { IdMother } from "../../domine/mother/IdMother";
import { LastNameMother } from "../../domine/mother/LastNameMother";
import { NamesMother } from "../../domine/mother/NamesMother";

interface ICreate {
    id: Uuid;
    names: NamesValueObject;
    last_name: LastNameValueObject;
    email: Email;
}

export class CreateCustomerRequestMother {
    static create({ id, names, last_name, email }: ICreate): CustomerCreatorRequest {
        return {
            id: id.value,
            names: names.value,
            last_name: last_name.value,
            email: email.value,
        }
    };

    static ramdon(): CustomerCreatorRequest {
        return this.create({
            id: IdMother.random(),
            names: NamesMother.random(),
            last_name: LastNameMother.random(),
            email: EmailMother.random()
        });
    }

    static invalidRequest(): CustomerCreatorRequest {
        return {
            id: IdMother.random().value,
            names: NamesMother.invalidName(),
            last_name: LastNameMother.random().value,
            email: EmailMother.random().value
        };
    }
}