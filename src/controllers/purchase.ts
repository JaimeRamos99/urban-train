import { NextFunction, Request, Response } from 'express';
import Redis from '../redis';

import { RedisObject } from '../application/interfaces/redisObject';
import { savePurchase } from '../mongo';
import { calculateRedisTTL } from '../common/utils/calculateRedisTTL';

export async function purchaseController(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const { idProducto, cantidad } = req.body;
        const redis = new Redis();
        const order_data: RedisObject = await redis.get(idProducto);

        // there's not info about that product in the cache
        if (!order_data) {
            //call mongo and check for total stock and set it for totalStock
            // for purchase this month set cantidad
        } else {
            // check if the purchases over the month plus the new quantity
            // are under the limit
            if (order_data.purchaseThisMonth + cantidad > 30) {
                return res.status(400).json({ status: 'not enough slots available for this item' });
            }

            // Calculates the remaining milliseconds until the current month ends
            const TTL = calculateRedisTTL();

            // updated redis object
            const new_order_data: RedisObject = {
                purchaseThisMonth: order_data.purchaseThisMonth + cantidad,
                totalStock: order_data.totalStock + cantidad,
            };

            await redis.set(idProducto, new_order_data, TTL);

            // add order to the database
            await savePurchase(req.body);
        }
    } catch (error) {
        next(error);
    }
}
