import { NextFunction, Request, Response } from 'express';
import { RedisObject } from '../application/interfaces/redisObject';
import { getStockFromDB } from '../mongo';
import Redis from '../redis';
import { calculateCurrentStock } from '../services/getCurrentStock';
import { saveTransactionService } from '../services/saveTransaction';

export async function saleController(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        req.body.tipoOperacion = 'SALE';
        const order = req.body;
        const { idProducto, cantidad } = order;

        const redis = new Redis();
        const product_data: RedisObject = await redis.get(idProducto);

        if (!product_data) {
            const transactions = await getStockFromDB(idProducto);
            const availableItems = calculateCurrentStock(transactions, idProducto);
            if (availableItems === 0 || cantidad > availableItems) {
                return res.status(400).json({ error: true, message: 'not enough stocks' });
            }
            await saveTransactionService(order, 0, availableItems);
        } else {
            const { purchaseThisMonth, totalStock } = product_data;
            if (totalStock === 0 || cantidad > totalStock) {
                return res.status(400).json({ error: true, message: 'not enough stocks' });
            }
            await saveTransactionService(order, purchaseThisMonth, totalStock - cantidad);
        }
    } catch (error) {
        next(error);
    }
}
