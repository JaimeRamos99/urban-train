import { NextFunction, Request, Response } from 'express';
import { Logger } from '../logger';

export async function saleController(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        Logger.debug(res);
    } catch (error) {
        next(error);
    }
}
