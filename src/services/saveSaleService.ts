import { Order } from '../application/interfaces/order';
import { constants } from '../common/constants';
import { RedisObject } from '../application/interfaces/redisObject';
import { calculateRedisTTL } from '../common/utils/calculateRedisTTL';
import { saveTransaction } from '../adapters/mongo';
import Redis from '../adapters/redis';
import { BusinessLogicError } from '../errors/businessLogicError';

export async function saveSaleService(
    order: Order,
    purchaseThisMonth: number,
    totalStock: number,
    quantity: number,
    addToCache: boolean,
) {
    const initialTotalStock = totalStock;
    if (quantity <= totalStock) {
        totalStock = totalStock - quantity;
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

    // check requested quantity does not exceeds the limit
    if (quantity > initialTotalStock) {
        throw new BusinessLogicError(constants.responseMessages.sale.noStock);
    }
    // add order to the database
    await saveTransaction(order);
}
