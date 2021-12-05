import { Request, Response } from 'express';
import { Logger } from '../adapters/logger';

function errorHandler(err: Error, req: Request, res: Response) {
    Logger.error(err.stack);
    res.status(500).json({ error: 'service error' });
}

export { errorHandler };
