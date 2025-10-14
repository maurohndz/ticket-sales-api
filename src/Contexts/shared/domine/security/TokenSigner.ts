export interface TokenSigner {
    sign(payload: object, options?: { expiresIn?: string | number }): string;
    verify<T = any>(token: string): T;
}
