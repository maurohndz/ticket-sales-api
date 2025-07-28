import { Customer } from "../../../../../src/Contexts/BoxOffice/Customer/domain/Customer";
import { Uuid } from "../../../../../src/Contexts/shared/domine/value-object/Uuid";
import { NamesValueObject } from "../../../../../src/Contexts/BoxOffice/Customer/domain/value-object/NamesValueObject";
import { LastNameValueObject } from "../../../../../src/Contexts/BoxOffice/Customer/domain/value-object/LastNameValueObject";
import { CustomerCreatorRequest } from "../../../../../src/Contexts/BoxOffice/Customer/application/CustomerCreatorRequest";
import { Email } from "../../../../../src/Contexts/shared/domine/value-object/EmailValueObject";
import { IdMother } from "./IdMother";
import { NamesMother } from "./NamesMother";
import { LastNameMother } from "./LastNameMother";
import { EmailMother } from "./EmailMother";

export class CustomerMother {
    static fromRequest(request: CustomerCreatorRequest) {
        return new Customer(
            new Uuid(request.id),
            new NamesValueObject(request.names),
            new LastNameValueObject(request.last_name),
            new Email(request.email)
        );
    }

    static random(): Customer {
        return new Customer(
            IdMother.random(),
            NamesMother.random(),
            LastNameMother.random(),
            EmailMother.random(),
        );
    }
}