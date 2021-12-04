import { NextFunction, Request, Response } from 'express';
import Redis from '../redis';
import { RedisObject } from '../application/interfaces/redisObject';
import { getStockFromDB } from '../mongo';
import { calculateCurrentStock } from '../services/getCurrentStock';
import { saveTransactionService } from '../services/saveTransaction';

export async function purchaseController(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        req.body.tipoOperacion = 'PURCHASE';
        const order = req.body;
        const { idProducto, cantidad } = order;

        const redis = new Redis();
        const product_data: RedisObject = await redis.get(idProducto);

        // there's no record in the cache
        if (!product_data) {
            const transactions = await getStockFromDB(idProducto);
            const availableItems = calculateCurrentStock(transactions, idProducto);
            await saveTransactionService(order, cantidad, availableItems);
        } else {
            // check requested quantity does not exceeds the limit
            if (product_data.purchaseThisMonth + cantidad > 30) {
                return res.status(400).json({ status: 'not enough slots available for this item' });
            }

            await saveTransactionService(
                order,
                product_data.purchaseThisMonth + cantidad,
                product_data.totalStock + cantidad,
            );
        }
        return res.status(200).json({ error: false, message: 'successful purchase' });
    } catch (error) {
        next(error);
    }
}
