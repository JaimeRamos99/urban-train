import { OrderType } from '../application/enums/orderType';
import { Order } from '../application/interfaces/order';
import Redis from '../adapters/redis';

export async function getRedisData(order: Order, orderType: OrderType): Promise<any> {
    order.orderType = orderType;
    const { productID } = order;

    const redis = new Redis();
    const productDataString: string = await redis.get(productID);
    const productData = JSON.parse(productDataString);
    return { productData, order };
}
