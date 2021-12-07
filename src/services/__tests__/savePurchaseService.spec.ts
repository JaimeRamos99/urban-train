import Redis from '../../adapters/redis';
import { saveTransaction } from '../../adapters/mongo';
import { buildOrder } from '../../tests/generate';
import { savePurchaseService } from '../savePurchaseService';

jest.mock('../../adapters/redis');
jest.mock('../../adapters/mongo');

test('should save data into redis, despite addToCache flag set to false', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Redis.mockImplementation(() => ({
        set: jest.fn().mockResolvedValue({}),
    }));

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    saveTransaction.mockReturnValue({});
    const mockOrder = buildOrder();
    const mockPurchaseThisMonth = 10;
    const mockTotalStock = 20;
    const mockQuantity = 2;
    const mockAddToCache = false;
    await savePurchaseService(mockOrder, mockPurchaseThisMonth, mockTotalStock, mockQuantity, mockAddToCache);

    expect(saveTransaction).toHaveBeenCalledWith(mockOrder);
    expect(saveTransaction).toHaveBeenCalledTimes(1);
    expect(Redis).toHaveBeenCalledTimes(1);
});
