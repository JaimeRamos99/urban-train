import { NextFunction, Request, Response } from 'express';
import { Logger } from '../logger';
import { savePurchase } from '../mongo';

export async function purchaseController(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        Logger.debug(res);

        return await savePurchase(req.body);
    } catch (error) {
        next(error);
    }
}
