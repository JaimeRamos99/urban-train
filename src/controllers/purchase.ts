import { NextFunction, Request, Response } from 'express';
import { getStockFromDB } from '../mongo';
import { calculateCurrentStock } from '../services/getCurrentStock';
import { saveTransactionService } from '../services/saveTransaction';
import { getRedisData } from '../services/getRedisData';
import { OrderType } from '../application/enums/orderType';
import { Order } from '../application/interfaces/order';

export async function purchaseController(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const { product_data, order }: any = await getRedisData(req.body, OrderType.purchase);
        const { productID, quantity }: Order = order;

        // there's no record in  cache
        if (!product_data) {
            const transactions = await getStockFromDB(productID);
            const availableItems = calculateCurrentStock(transactions, productID);
            await saveTransactionService(order, quantity, availableItems);
        } else {
            // check requested quantity does not exceeds the limit
            if (product_data.purchaseThisMonth + quantity > 30) {
                return res.status(400).json({ error: true, status: 'not enough slots available for this item' });
            }

            await saveTransactionService(
                order,
                product_data.purchaseThisMonth + quantity,
                product_data.totalStock + quantity,
            );
        }
        return res.status(200).json({ error: false, message: 'successful purchase' });
    } catch (error) {
        next(error);
    }
}
