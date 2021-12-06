import { NextFunction, Request, Response } from 'express';
import { Logger } from '../adapters/logger';
import { CustomError } from '../errors/customError';
import { constants } from '../common/constants';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    Logger.error(err.stack);

    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ error: true, errors: err.serializeErrors() });
    }

    res.status(500).json({ error: true, errors: [{ message: constants.responseMessages.general.error }] });
    next();
};
