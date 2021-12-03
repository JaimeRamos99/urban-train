import { NextFunction, Request, Response } from 'express';
import { orderJoiSchema } from '../application/entities/order';

function schemaValidation(req: Request, res: Response, next: NextFunction) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true, // remove unknown props
    };

    const { error, value } = orderJoiSchema.validate(req.body, options);

    if (error) {
        res.status(500).json({ error: 'invalid entity' });
    } else {
        req.body = value;
        next();
    }
}

export { schemaValidation };
