import { ValidationError } from 'joi';
import { CustomError } from './customError';

export class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(public errors: ValidationError) {
        super(errors.message);
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.details.map((error: any) => {
            return { message: error.message, field: error.context.label };
        });
    }
}
