import { v4 as uuidv4 } from 'uuid';
import { Uuid } from '../../../../shared/domine/value-object/Uuid';

export class Customer {
  private readonly _id: Uuid;
  private _names: string;
  private _lastName: string;
  private _email: string;
  private _status: boolean;

  constructor(
    id: Uuid,
    names: string,
    lastName: string,
    email: string,
    status = true,
  ) {
    this._id = id ?? uuidv4();
    this._names = names;
    this._lastName = lastName;
    this._email = email;
    this._status = status;
  }

  // Getters
  get id(): Uuid {
    return this._id;
  }

  get names(): string {
    return this._names;
  }

  get lastName(): string {
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
      id: this._id.getValue(),
      names: this._names,
      lastName: this._lastName,
      email: this._email,
      status: this._status,
    };
  }
}
