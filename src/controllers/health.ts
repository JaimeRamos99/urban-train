import { Request, Response } from 'express';

export async function healthController(req: Request, res: Response): Promise<void> {
    const data = {
        uptime: process.uptime(),
        message: 'OK',
        date: new Date(),
    };

    res.status(200).send(data);
}
