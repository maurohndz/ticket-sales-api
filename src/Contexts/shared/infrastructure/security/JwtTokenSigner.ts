import jwt, { SignOptions } from 'jsonwebtoken';
import { TokenSigner } from '../../../shared/domine/security/TokenSigner';

export class JwtTokenSigner implements TokenSigner {
    constructor(private readonly secret: string) {}

    sign(payload: object, options?: SignOptions): string {
        return jwt.sign(payload as any, this.secret, { ...(options ?? {}), expiresIn: options?.expiresIn ?? '1h' });
    }

    verify<T = any>(token: string): T {
        return jwt.verify(token, this.secret) as T;
    }
}
