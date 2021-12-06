import { Request, Response } from 'express';
import { calculateCurrentStock } from '../services/calculateCurrentStock';
import { getRedisData } from '../services/getRedisData';
import { Order } from '../application/interfaces/order';
import { OrderType } from '../application/enums/orderType';
import { saveSaleService } from '../services/saveSaleService';
import { constants } from '../common/constants';

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
    return res.status(201).json({ error: false, message: constants.responseMessages.sale.successful });
}
