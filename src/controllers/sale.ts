import { Request, Response } from 'express';
import { calculateCurrentStock } from '../services/getCurrentStock';
import { getRedisData } from '../services/getRedisData';
import { Order } from '../application/interfaces/order';
import { OrderType } from '../application/enums/orderType';
import { saveSaleService } from '../services/saveSaleService';

export async function saleController(req: Request, res: Response): Promise<any> {
    const { productData, order }: any = await getRedisData(req.body, OrderType.sale);
    const { productID, quantity }: Order = order;

    if (!productData) {
        const { purchaseThisMonth, totalStock } = await calculateCurrentStock(productID);
        await saveSaleService(order, purchaseThisMonth, totalStock, quantity, true);
    } else {
        const { purchaseThisMonth, totalStock } = productData;
        await saveSaleService(order, purchaseThisMonth, totalStock, quantity, false);
    }
    return res.status(200).json({ error: false, message: 'successful sale' });
}
