class BaseError extends Error {
    params: {};

    constructor(error: string | undefined, params = {}) {
        super(error);

        this.params = params;
    }
}

export default BaseError;
