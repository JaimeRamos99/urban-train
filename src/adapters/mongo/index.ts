import { model, connect, connection } from 'mongoose';
import { orderSchema, OrderMongo } from './schemas/order';
import { Order } from '../../application/interfaces/order';
import { envVars } from '../../common/utils/envVarsHandler';

const orderModel = model<OrderMongo>('Order', orderSchema);

export async function createConnection(): Promise<void> {
    await connect(envVars.MONGO_HOST);
}

export async function saveTransaction(order: Order): Promise<void> {
    const newSaleOrder = new orderModel(order);
    await newSaleOrder.save();
}
export async function getStockFromDB(productID: string): Promise<any> {
    return await orderModel.find({ productID: { $eq: productID } });
}

export async function closeConnection(): Promise<void> {
    await connection.close();
}
