import { CustomError } from './customError';

export class BusinessLogicError extends CustomError {
    statusCode = 400;

    constructor(public message: string) {
        super(message);
        Object.setPrototypeOf(this, BusinessLogicError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}
