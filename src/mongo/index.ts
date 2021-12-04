import { model, connect, connection } from 'mongoose';
import { orderSchema, OrderMongo } from './schemas/order';
import { Order } from '../application/interfaces/order';

const orderModel = model<OrderMongo>('Order', orderSchema);

export async function createConnection(): Promise<void> {
    await connect('mongodb://mongodb_container:27017/orders');
}

export async function saveTransaction(order: Order): Promise<void> {
    const newSaleOrder = new orderModel(order);
    await newSaleOrder.save();
}
export async function getStockFromDB(idProduct: string): Promise<any> {
    return await orderModel.find({ idProducto: { $eq: idProduct } });
}

export async function closeConnection(): Promise<void> {
    await connection.close();
}
