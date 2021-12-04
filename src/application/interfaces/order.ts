import { OrderType } from '../enums/orderType';

export interface Order {
    id: string;
    date: string;
    time?: string;
    quantity: number;
    productID: string;
    productName: string;
    orderType?: OrderType;
}
