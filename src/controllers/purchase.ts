import { Request, Response } from 'express';
import { calculateCurrentStock } from '../services/getCurrentStock';
import { saveTransactionService } from '../services/saveTransaction';
import { getRedisData } from '../services/getRedisData';
import { OrderType } from '../application/enums/orderType';
import { Order } from '../application/interfaces/order';
import { BusinessLogicError } from '../errors/businessLogicError';

export async function purchaseController(req: Request, res: Response): Promise<any> {
    const { productData, order }: any = await getRedisData(req.body, OrderType.purchase);
    const { productID, quantity }: Order = order;

    // there's no record in  cache
    if (!productData) {
        const availableItems = await calculateCurrentStock(productID);
        await saveTransactionService(order, quantity, availableItems + quantity);
    } else {
        // check requested quantity does not exceeds the limit
        if (productData.purchaseThisMonth + quantity > 30) {
            throw new BusinessLogicError('not enough slots available for this item');
        }

        await saveTransactionService(
            order,
            productData.purchaseThisMonth + quantity,
            productData.totalStock + quantity,
        );
    }
    return res.status(200).json({ error: false, message: 'successful purchase' });
}
