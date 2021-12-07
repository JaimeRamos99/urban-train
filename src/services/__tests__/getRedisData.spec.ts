import { buildOrder } from '../../tests/generate';
import { OrderType } from '../../application/enums/orderType';
import { getRedisData } from '../getRedisData';
import Redis from '../../adapters/redis';

jest.mock('../../adapters/redis');

test('get Redis Data function, succesful case', async () => {
    const mockProductData = { purchaseThisMonth: 'mock', totalStock: 'mock' };
    const mockProductDataJson: string = JSON.stringify({ purchaseThisMonth: 'mock', totalStock: 'mock' });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Redis.mockImplementation(() => ({
        get: jest.fn().mockResolvedValue(mockProductDataJson),
    }));

    const mockOrder = buildOrder();
    const { productData, order } = await getRedisData(mockOrder, OrderType.purchase);

    expect(productData).toEqual(mockProductData);
    expect(order).toEqual(mockOrder);
});
