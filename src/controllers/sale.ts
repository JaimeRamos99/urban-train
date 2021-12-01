import { Request, Response } from 'express';
import { Logger } from '../logger';

export async function saleController(req: Request, res: Response): Promise<void> {
    Logger.debug(res);
}
