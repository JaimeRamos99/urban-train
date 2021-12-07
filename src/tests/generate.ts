import { OrderType } from '../application/enums/orderType';
import { Order } from '../application/interfaces/order';

function buildOrder({ ...overrides } = {}) {
    const order: Order = {
        id: 'qwe',
        date: '25/12/2021',
        quantity: 3,
        productID: 'qws',
        productName: 'jae',
        orderType: OrderType.purchase,
        ...overrides,
    };
    return order;
}

function buildReq({ ...overrides } = {}) {
    const req = { body: {}, params: {}, ...overrides };
    return req;
}

function buildRes(overrides = {}) {
    const res: any = {
        json: jest.fn(() => res).mockName('json'),
        status: jest.fn(() => res).mockName('status'),
        ...overrides,
    };
    return res;
}

function buildNext(impl?: ((...args: any[]) => unknown) | undefined) {
    return jest.fn(impl).mockName('next');
}

export { buildOrder, buildReq, buildRes, buildNext };
