import { OrderType } from '../application/enums/orderType';
import { Order } from '../application/interfaces/order';
import Redis from '../redis';

export async function getRedisData(order: Order, orderType: OrderType): Promise<any> {
    order.orderType = orderType;
    const { productID } = order;

    const redis = new Redis();
    const product_data_string: string = await redis.get(productID);
    const product_data = JSON.parse(product_data_string);
    return { product_data, order };
}
