import { Request, Response } from 'express';

export async function healthController(req: Request, res: Response): Promise<void> {
    try {
        const data = {
            uptime: process.uptime(),
            message: 'OK',
            date: new Date(),
        };
        res.status(200).json(data);
    } catch (error: any) {
        throw new Error(error.message);
    }
}
