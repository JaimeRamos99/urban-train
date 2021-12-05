import { Request, Response } from 'express';
import { BusinessLogicError } from '../errors/businessLogicError';
import { calculateCurrentStock } from '../services/getCurrentStock';
import { getRedisData } from '../services/getRedisData';
import { getStockFromDB } from '../adapters/mongo';
import { Order } from '../application/interfaces/order';
import { OrderType } from '../application/enums/orderType';
import { saveTransactionService } from '../services/saveTransaction';

export async function saleController(req: Request, res: Response): Promise<any> {
    const { productData, order }: any = await getRedisData(req.body, OrderType.sale);
    const { productID, quantity }: Order = order;

    if (!productData) {
        const transactions = await getStockFromDB(productID);
        const availableItems = calculateCurrentStock(transactions, productID);
        if (availableItems === 0 || quantity > availableItems) {
            throw new BusinessLogicError('not enough stocks');
        }
        await saveTransactionService(order, 0, availableItems);
    } else {
        const { purchaseThisMonth, totalStock } = productData;
        if (totalStock === 0 || quantity > totalStock) {
            throw new BusinessLogicError('not enough stocks');
        }
        await saveTransactionService(order, purchaseThisMonth, totalStock - quantity);
        return res.status(200).json({ error: false, message: 'successful sale' });
    }
}
