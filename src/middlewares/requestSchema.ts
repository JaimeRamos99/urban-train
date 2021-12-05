import { NextFunction, Request, Response } from 'express';
import { RequestValidationError } from '../application/entities/errors/requestValidationError';
import { orderJoiSchema } from '../application/entities/order';
import { constants } from '../common/constants';

function schemaValidation(req: Request, res: Response, next: NextFunction) {
    try {
        const { error, value } = orderJoiSchema.validate(req.body, constants.joiSchemaOptions);

        if (error) {
            throw new RequestValidationError(error);
        } else {
            req.body = value;
            next();
        }
    } catch (error) {
        next(error);
    }
}

export { schemaValidation };
