import { Request, Response } from 'express';
import { calculateCurrentStock } from '../services/getCurrentStock';
import { savePurchaseService } from '../services/savePurchaseService';
import { getRedisData } from '../services/getRedisData';
import { OrderType } from '../application/enums/orderType';
import { Order } from '../application/interfaces/order';
import { constants } from '../common/constants';

export async function purchaseController(req: Request, res: Response): Promise<any> {
    const { productData, order }: any = await getRedisData(req.body, OrderType.purchase);
    const { productID, quantity }: Order = order;

    // there's no record in  cache
    if (!productData) {
        const { purchaseThisMonth, totalStock } = await calculateCurrentStock(productID);
        await savePurchaseService(order, purchaseThisMonth, totalStock, quantity, true);
    } else {
        // there's data in cache for this product
        await savePurchaseService(order, productData.purchaseThisMonth, productData.totalStock, quantity, false);
    }
    return res.status(201).json({ error: false, message: constants.responseMessages.purchase.successful });
}
