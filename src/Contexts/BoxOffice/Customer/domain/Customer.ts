import {ICustomer} from './ICustomer.js';
import { v4 as uuidv4 } from 'uuid';

export class Customer {
  private readonly _id?: string;
  private _names: string;
  private _lastName: string;
  private _email: string;
  private _status: boolean;
  private readonly _createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt?: Date;

  constructor({
    id,
    names,
    lastName,
    email,
    status = true,
    createdAt = new Date(),
    updatedAt = new Date(),
    deletedAt
  }: ICustomer) {
    this._id = id ?? uuidv4();
    this._names = names;
    this._lastName = lastName;
    this._email = email;
    this._status = status;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._deletedAt = deletedAt;
  }

  // Getters
  get id(): string | undefined {
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

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get deletedAt(): Date | undefined {
    return this._deletedAt;
  }

  get fullName(): string {
    return `${this._names} ${this._lastName}`;
  }

  get isActive(): boolean {
    return this._status && !this._deletedAt;
  }

  // Método para convertir a objeto plano (útil para persistencia)
  public toPrimitives(): ICustomer {
    return {
      id: this._id,
      names: this._names,
      lastName: this._lastName,
      email: this._email,
      status: this._status,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt
    };
  }
}
