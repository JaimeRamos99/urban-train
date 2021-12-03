import { Order } from './order';

interface DatabaseStorage {
    createConnection(): Promise<void>;
    savePurchase(order: Order): Promise<void>;
    saveSale(order: Order): Promise<void>;
}

export { DatabaseStorage };
