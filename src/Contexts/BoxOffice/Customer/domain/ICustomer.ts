import { Transaction } from "sequelize";

export interface ICustomer {
    id?: string;
    names: string;
    lastName: string;
    email: string;
    status?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface ICreateCustomer {
    id?: string;
    names: string;
    lastName: string;
    email: string;
}

export interface ICustomerRepository {
    save(data: ICreateCustomer, transaction?: Transaction): Promise<ICustomer>;
}