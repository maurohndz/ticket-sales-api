import { CustomerCreatorRequest } from "../../../../../src/Contexts/BoxOffice/Customer/application/CustomerCreatorRequest";
import { LastNameValueObject } from "../../../../../src/Contexts/BoxOffice/Customer/domain/value-object/LastNameValueObject";
import { NamesValueObject } from "../../../../../src/Contexts/BoxOffice/Customer/domain/value-object/NamesValueObject";
import { Uuid } from "../../../../../src/shared/domine/value-object/Uuid";
import { Email } from "../../../../../src/shared/domine/value-object/EmailValueObject";
import { EmailMother } from "../../domine/mother/EmailMother";
import { IdMother } from "../../domine/mother/IdMother";
import { LastNameMother } from "../../domine/mother/LastNameMother";
import { NamesMother } from "../../domine/mother/NamesMother";

interface ICreate {
    id: Uuid;
    names: NamesValueObject;
    lastName: LastNameValueObject;
    email: Email;
}

export class CreateCustomerRequestMother {
    static create({ id, names, lastName, email }: ICreate): CustomerCreatorRequest {
        return {
            id: id.value,
            names: names.value,
            lastName: lastName.value,
            email: email.value,
        }
    };

    static ramdon(): CustomerCreatorRequest {
        return this.create({
            id: IdMother.random(),
            names: NamesMother.random(),
            lastName: LastNameMother.random(),
            email: EmailMother.random()
        });
    }

    static invalidRequest(): CustomerCreatorRequest {
        return {
            id: IdMother.random().value,
            names: NamesMother.invalidName(),
            lastName: LastNameMother.random().value,
            email: EmailMother.random().value
        };
    }
}