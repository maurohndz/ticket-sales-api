import { Uuid } from '../../../../shared/domine/value-object/Uuid';
import { Email } from '../../../../shared/domine/value-object/EmailValueObject';
import { NamesValueObject } from './value-object/NamesValueObject';
import { LastNameValueObject } from './value-object/LastNameValueObject';

export class Customer {
  readonly _id: Uuid;
  readonly _names: NamesValueObject;
  readonly _lastName: LastNameValueObject;
  readonly _email: Email;
  readonly _status: boolean;

  constructor({
    id,
    names,
    lastName,
    email,
    status = true,
  } : {
    id: Uuid,
    names: NamesValueObject,
    lastName: LastNameValueObject,
    email: Email,
    status?: boolean
  }) {
    this._id = id ;
    this._names = names;
    this._lastName = lastName;
    this._email = email;
    this._status = status;
  }

  public static fromPrimitives({ id, names, lastName, email }: { id: string, names: string; lastName: string, email: string }) {
    return new Customer({
      id: new Uuid(id),
      names: new NamesValueObject(names),
      lastName: new LastNameValueObject(lastName),
      email: new Email(email)
    });
  }

  // Método para convertir a objeto plano (útil para persistencia)
  public toPrimitives() {
    return {
      id: this._id.value,
      names: this._names.value,
      lastName: this._lastName.value,
      email: this._email.value,
      status: this._status,
    };
  }
}
