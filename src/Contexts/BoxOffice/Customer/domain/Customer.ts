import { Uuid } from '../../../shared/domine/value-object/Uuid';
import { Email } from '../../../shared/domine/value-object/EmailValueObject';
import { NamesValueObject } from './value-object/NamesValueObject';
import { LastNameValueObject } from './value-object/LastNameValueObject';

export class Customer {
  readonly _id: Uuid;
  readonly _names: NamesValueObject;
  readonly _lastName: LastNameValueObject;
  readonly _email: Email;

  constructor({
    id,
    names,
    lastName,
    email,
  } : {
    id: Uuid,
    names: NamesValueObject,
    lastName: LastNameValueObject,
    email: Email,
  }) {
    this._id = id ;
    this._names = names;
    this._lastName = lastName;
    this._email = email;
  }

  // Getters para las propiedades privadas
  get id(): Uuid {
    return this._id;
  }

  get names(): NamesValueObject {
    return this._names;
  }

  get lastName(): LastNameValueObject {
    return this._lastName;
  }

  get email(): Email {
    return this._email;
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
    };
  }
}
