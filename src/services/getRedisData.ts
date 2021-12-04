import { OrderType } from '../application/enums/orderType';
import { Order } from '../application/interfaces/order';
import { RedisObject } from '../application/interfaces/redisObject';
import Redis from '../redis';

export async function getRedisData(order: Order, orderType: OrderType): Promise<any> {
    order.orderType = orderType;
    const { productID } = order;

    const redis = new Redis();
    const product_data: RedisObject = await redis.get(productID);
    return { product_data, order };
}
