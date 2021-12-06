import { Order } from '../application/interfaces/order';
import { constants } from '../common/constants';
import { RedisObject } from '../application/interfaces/redisObject';
import { calculateRedisTTL } from '../common/utils/calculateRedisTTL';
import { saveTransaction } from '../adapters/mongo';
import Redis from '../adapters/redis';
import { BusinessLogicError } from '../errors/businessLogicError';

export async function savePurchaseService(
    order: Order,
    purchaseThisMonth: number,
    totalStock: number,
    quantity: number,
    addToCache: boolean,
) {
    const initialPurchaseThisMonth = purchaseThisMonth;

    if (purchaseThisMonth + quantity <= 30) {
        purchaseThisMonth = purchaseThisMonth + quantity;
        totalStock = totalStock + quantity;
        addToCache = true;
    }
    if (addToCache) {
        const redis = new Redis();
        const new_order_data: RedisObject = {
            purchaseThisMonth: purchaseThisMonth,
            totalStock: totalStock,
        };

        const TTL = calculateRedisTTL();
        await redis.set(order.productID, new_order_data, TTL);
    }

    // check availability to purchase this month
    if (initialPurchaseThisMonth + quantity > 30) {
        throw new BusinessLogicError(constants.responseMessages.purchase.noSlots);
    }
    // add order to the database
    await saveTransaction(order);
}
