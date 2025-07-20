import { Customer } from "../../../../../src/Contexts/BoxOffice/Customer/domain/Customer";
import { Uuid } from "../../../../../src/shared/domine/value-object/Uuid";
import { NamesValueObject } from "../../../../../src/Contexts/BoxOffice/Customer/domain/value-object/NamesValueObject";
import { LastNameValueObject } from "../../../../../src/Contexts/BoxOffice/Customer/domain/value-object/LastNameValueObject";
import { CustomerCreatorRequest } from "../../../../../src/Contexts/BoxOffice/Customer/application/CustomerCreatorRequest";
import { Email } from "../../../../../src/shared/domine/value-object/EmailValueObject";

export class CustomerMother {
    static fromRequest(request: CustomerCreatorRequest) {
        return new Customer({
            id: new Uuid(request.id),
            names: new NamesValueObject(request.names),
            lastName: new LastNameValueObject(request.lastName),
            email: new Email(request.email)
        });
    }
}