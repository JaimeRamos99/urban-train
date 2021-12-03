import { NextFunction, Request, Response } from 'express';
import { orderJoiSchema } from '../application/entities/order';
import { constants } from '../common/constants';

function schemaValidation(req: Request, res: Response, next: NextFunction) {
    const { error, value } = orderJoiSchema.validate(req.body, constants.joiSchemaOptions);

    if (error) {
        res.status(500).json({ error: 'invalid request body' });
    } else {
        req.body = value;
        next();
    }
}

export { schemaValidation };
