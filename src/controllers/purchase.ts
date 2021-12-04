import { NextFunction, Request, Response } from 'express';
import Redis from '../redis';
import { RedisObject } from '../application/interfaces/redisObject';
import { getStock } from '../mongo';
import { calculateCurrentStock } from '../services/getCurrentStock';
import { savePurchaseService } from '../services/savePurchase';

export async function purchaseController(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const { idProducto, cantidad } = req.body;
        const redis = new Redis();
        const order_data: RedisObject = await redis.get(idProducto);

        // there's not info about that product in the cache
        if (!order_data) {
            const transactions = await getStock(idProducto);
            const availableItems = calculateCurrentStock(transactions, idProducto);
            await savePurchaseService(req.body, cantidad, availableItems);
            return res.status(400).json({ availableItems });
        } else {
            // check requested quantity does not exceeds the limit
            if (order_data.purchaseThisMonth + cantidad > 30) {
                return res.status(400).json({ status: 'not enough slots available for this item' });
            }

            await savePurchaseService(
                req.body,
                order_data.purchaseThisMonth + cantidad,
                order_data.totalStock + cantidad,
            );
        }
    } catch (error) {
        next(error);
    }
}
