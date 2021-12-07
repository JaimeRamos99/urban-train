import { buildReq, buildRes } from '../../tests/generate';
import { purchaseController } from '../purchase';
import { calculateCurrentStock } from '../../services/calculateCurrentStock';
import { getRedisData } from '../../services/getRedisData';

jest.mock('../../services/calculateCurrentStock');
jest.mock('../../services/getRedisData');

test('', async () => {
    /*const mockGetRedisDataResponse = {
        productData: {},
        order: {},
    };*/
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    calculateCurrentStock.mockReturnValue({});

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    getRedisData.mockReturnValue({});
    const mockReq = buildReq();
    const mockRes = buildRes();
    await purchaseController(mockReq, mockRes);
});
