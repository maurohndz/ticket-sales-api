import { Uuid } from '../../../../shared/domine/value-object/Uuid';
import { NamesValueObject } from './value-object/NamesValueObject';
import { LastNameValueObject } from './value-object/LastNameValueObject';

export class Customer {
  private readonly _id: Uuid;
  private _names: NamesValueObject;
  private _lastName: LastNameValueObject;
  private _email: string;
  private _status: boolean;

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
    email: string,
    status?: boolean
  }) {
    this._id = id ;
    this._names = names;
    this._lastName = lastName;
    this._email = email;
    this._status = status;
  }

  // Getters
  get id(): Uuid {
    return this._id;
  }

  get names() {
    return this._names;
  }

  get lastName() {
    return this._lastName;
  }

  get email(): string {
    return this._email;
  }

  get status(): boolean {
    return this._status;
  }


  get fullName(): string {
    return `${this._names} ${this._lastName}`;
  }

  // Método para convertir a objeto plano (útil para persistencia)
  public toPrimitives() {
    return {
      id: this._id.value,
      names: this._names.value,
      lastName: this._lastName.value,
      email: this._email,
      status: this._status,
    };
  }
}
