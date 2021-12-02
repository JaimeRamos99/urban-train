import { NextFunction, Request, Response } from 'express';

export async function healthController(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const data = {
            uptime: process.uptime(),
            message: 'OK',
            date: new Date(),
        };
        res.status(200).send(data);
    } catch (error) {
        next(error);
    }
}
