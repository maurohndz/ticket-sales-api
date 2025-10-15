import { Uuid } from "../../../shared/domine/value-object/Uuid";
import { CustomerRepository } from "../domain/CustomerRepository";

export class CustomerViewer {
    constructor(private readonly repository: CustomerRepository) {}

    async run(customerId: string) {
        return await this.repository.find(new Uuid(customerId));
    }
}