import { Order } from '../application/interfaces/order';
import { RedisObject } from '../application/interfaces/redisObject';
import { calculateRedisTTL } from '../common/utils/calculateRedisTTL';
import { saveTransaction } from '../adapters/mongo';
import Redis from '../adapters/redis';

export async function saveTransactionService(order: Order, purchaseThisMonth: number, totalStock: number) {
    const redis = new Redis();

    // new redis object
    const new_order_data: RedisObject = {
        purchaseThisMonth: purchaseThisMonth,
        totalStock: totalStock,
    };

    const TTL = calculateRedisTTL();
    await redis.set(order.productID, new_order_data, TTL);
    // add order to the database
    await saveTransaction(order);
}
