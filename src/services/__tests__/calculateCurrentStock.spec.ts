import { getStockFromDB } from '../../adapters/mongo';
import { OrderType } from '../../application/enums/orderType';
import { calculateCurrentStock } from '../calculateCurrentStock';

jest.mock('../../adapters/mongo');

test('calculateCurrentStock should return 0 for both values', async () => {
    const mockProductID = 'mockProductID';
    const mockTransactions = [{ productID: 'prodID', quantity: 1, orderType: OrderType.purchase, date: '25/12/2021' }];

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    getStockFromDB.mockReturnValue(mockTransactions);
    const { purchaseThisMonth, totalStock } = await calculateCurrentStock(mockProductID);

    expect(purchaseThisMonth).toEqual(0);
    expect(totalStock).toEqual(0);
});

test('calculateCurrentStock should return 1 for both values', async () => {
    const mockProductID = 'mockProductID';
    const mockTransactions = [
        { productID: 'mockProductID', quantity: 1, orderType: OrderType.purchase, date: '25/12/2021' },
    ];

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    getStockFromDB.mockReturnValue(mockTransactions);
    const { purchaseThisMonth, totalStock } = await calculateCurrentStock(mockProductID);

    expect(purchaseThisMonth).toEqual(1);
    expect(totalStock).toEqual(1);
});

test('calculateCurrentStock should return 3 for purchaseThisMonth and 2 for totalStock', async () => {
    const mockProductID = 'mockProductID';
    const mockTransactions = [
        { productID: 'mockProductID', quantity: 1, orderType: OrderType.sale, date: '25/12/2021' },
        { productID: 'mockProductID', quantity: 3, orderType: OrderType.purchase, date: '25/12/2021' },
    ];

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    getStockFromDB.mockReturnValue(mockTransactions);
    const { purchaseThisMonth, totalStock } = await calculateCurrentStock(mockProductID);

    expect(purchaseThisMonth).toEqual(3);
    expect(totalStock).toEqual(2);
});
