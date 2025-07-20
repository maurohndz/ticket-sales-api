import { Collection, MongoClient } from "mongodb";
import { CustomerRepository } from "../../domain/CustomerRepository";
import { Customer } from "../../domain/Customer";
import { Uuid } from "../../../../../shared/domine/value-object/Uuid";

interface CustomerDocument {
    _id: string;
    names: string;
    lastName: string;
    email: string;
}

export class MongoCustomerRepository implements CustomerRepository {
    constructor(private readonly client: Promise<MongoClient>) {}

    public save(customer: Customer): Promise<void> {
        return this.persist(customer._id.value, customer);
    }

    public async search(id: Uuid): Promise<null|Customer> {
        const collection = await this.collection();
        const document = await collection.findOne<CustomerDocument>({ id: id.value });

        return document ? Customer.fromPrimitives({
            id: id.value,
            names: document.names,
            lastName: document.lastName,
            email: document.email
        }) : null;
    }

    private async persist(id: string, aggregateRoot: Customer): Promise<void> {
        const collection = await this.collection();
        const document = { ...aggregateRoot.toPrimitives(), _id: id, id: undefined };

        await collection.updateOne({ _id: id }, { $set: document }, { upsert: true });
    }

    private async collection(): Promise<Collection<CustomerDocument>> {
        return (await this.client).db().collection<CustomerDocument>(this.collectionName());
    }

    protected collectionName(): string {
        return 'customer';
    }
}