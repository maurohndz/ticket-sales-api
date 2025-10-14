import { Exception } from "../../../shared/domine/Exception";
import { Email } from "../../../shared/domine/value-object/EmailValueObject";
import { PasswordHasher } from "../../../shared/domine/security/PasswordHasher";
import { CustomerRepository } from "../domain/CustomerRepository";
import { CustomerBasicLoginRequest } from "./requests/CustomerBasicLoginRequest";
import { JwtTokenSigner } from "../../../shared/infrastructure/security/JwtTokenSigner";

export class CustomerBasicLogin {
    constructor(
        private readonly repository: CustomerRepository,
        private readonly passwordHasher: PasswordHasher,
        private readonly jwtTokenSigner: JwtTokenSigner,
    ) {}

    async run(request: CustomerBasicLoginRequest) {
        const email = new Email(request.email);

        const customer = await this.repository.search({ email });

        if (!customer) throw new Exception(`Invalid credentials`);

        const isValidPassword = await customer.credential.password.matches(request.password, this.passwordHasher);

        if (!isValidPassword) throw new Exception(`Invalid credentials`);

        const token = await this.jwtTokenSigner.sign({
            sub: customer.id, 
        });

        return token;
    }
}
