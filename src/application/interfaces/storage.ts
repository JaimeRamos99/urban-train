import { Order } from './order';

interface DatabaseStorage {
    createConnection(): Promise<void>;
    savePurchase(order: Order): Promise<void>;
    saveSale(order: Order): Promise<void>;
    checkStock(idProduct: string): Promise<any>;
}

export { DatabaseStorage };
