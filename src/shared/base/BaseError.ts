class BaseError extends Error {
    ownParams: {};

    constructor(error: string | undefined, params = {}) {
        super(error);

        this.ownParams = params;
    }
}

export default BaseError;
