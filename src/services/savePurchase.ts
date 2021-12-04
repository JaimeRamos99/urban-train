import { Order } from '../application/interfaces/order';
import { RedisObject } from '../application/interfaces/redisObject';
import { calculateRedisTTL } from '../common/utils/calculateRedisTTL';
import { savePurchase } from '../mongo';
import Redis from '../redis';

export async function savePurchaseService(order: Order, purchaseThisMonth: number, totalStock: number) {
    // new redis object
    const new_order_data: RedisObject = {
        purchaseThisMonth: purchaseThisMonth,
        totalStock: totalStock,
    };

    const TTL = calculateRedisTTL();

    const redis = new Redis();
    await redis.set(order.idProducto, new_order_data, TTL);

    // add order to the database
    await savePurchase(order);
}
