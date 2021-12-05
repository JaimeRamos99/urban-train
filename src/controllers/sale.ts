import { NextFunction, Request, Response } from 'express';
import { OrderType } from '../application/enums/orderType';
import { getStockFromDB } from '../mongo';
import { calculateCurrentStock } from '../services/getCurrentStock';
import { getRedisData } from '../services/getRedisData';
import { saveTransactionService } from '../services/saveTransaction';
import { Order } from '../application/interfaces/order';

export async function saleController(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const { productData, order }: any = await getRedisData(req.body, OrderType.sale);
        const { productID, quantity }: Order = order;

        if (!productData) {
            const transactions = await getStockFromDB(productID);
            const availableItems = calculateCurrentStock(transactions, productID);
            if (availableItems === 0 || quantity > availableItems) {
                return res.status(400).json({ error: true, message: 'not enough stocks' });
            }
            await saveTransactionService(order, 0, availableItems);
        } else {
            const { purchaseThisMonth, totalStock } = productData;
            if (totalStock === 0 || quantity > totalStock) {
                return res.status(400).json({ error: true, message: 'not enough stocks' });
            }
            await saveTransactionService(order, purchaseThisMonth, totalStock - quantity);
            return res.status(200).json({ error: false, message: 'successful sale' });
        }
    } catch (error) {
        next(error);
    }
}
