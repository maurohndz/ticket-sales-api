import { Uuid } from '../../../shared/domine/value-object/Uuid';
import { Email } from '../../../shared/domine/value-object/EmailValueObject';
import { NamesValueObject } from './value-object/NamesValueObject';
import { LastNameValueObject } from './value-object/LastNameValueObject';
import { Credential } from './Credential';
import { PasswordValueObject } from '../../../shared/domine/value-object/PasswordValueObject';

export class Customer {
  readonly _id: Uuid;
  readonly _names: NamesValueObject;
  readonly _last_name: LastNameValueObject;
  readonly _email: Email;
  readonly _credential: Credential;

  constructor(
    id: Uuid,
    names: NamesValueObject,
    last_name: LastNameValueObject,
    email: Email,
    credential: Credential
  ) {
    this._id = id ;
    this._names = names;
    this._last_name = last_name;
    this._email = email;
    this._credential = credential;
  }

  // Getters para las propiedades privadas
  get id(): Uuid {
    return this._id;
  }

  get names(): NamesValueObject {
    return this._names;
  }

  get last_name(): LastNameValueObject {
    return this._last_name;
  }

  get email(): Email {
    return this._email;
  }

  get credential(): Credential {
    return this._credential;
  }

  public static fromPrimitives({ id, names, last_name, email }: { id: string, names: string; last_name: string, email: string }) {
    const customerId = new Uuid(id);
    const credential = new Credential(customerId, new PasswordValueObject(''));
    return new Customer(
      customerId,
      new NamesValueObject(names),
      new LastNameValueObject(last_name),
      new Email(email),
      credential
    );
  }

  // Método para convertir a objeto plano (útil para persistencia)
  public toPrimitives() {
    return {
      id: this._id.value,
      names: this._names.value,
      last_name: this._last_name.value,
      email: this._email.value,
    };
  }
}
