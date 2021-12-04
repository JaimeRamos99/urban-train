import { NextFunction, Request, Response } from 'express';
import { OrderType } from '../application/enums/orderType';
import { getStockFromDB } from '../mongo';
import { calculateCurrentStock } from '../services/getCurrentStock';
import { getRedisData } from '../services/getRedisData';
import { saveTransactionService } from '../services/saveTransaction';

export async function saleController(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const { product_data, order }: any = await getRedisData(req.body, OrderType.sale);
        const { idProducto, cantidad } = order;

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
