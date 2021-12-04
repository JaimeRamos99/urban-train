import { OrderType } from '../application/enums/orderType';
import { Order } from '../application/interfaces/order';
import { RedisObject } from '../application/interfaces/redisObject';
import Redis from '../redis';

export async function getRedisData(order: Order, orderType: OrderType): Promise<any> {
    order.tipoOperacion = orderType;
    const { idProducto } = order;

    const redis = new Redis();
    const product_data: RedisObject = await redis.get(idProducto);
    return { product_data, order };
}
