import { model, connect, connection } from 'mongoose';
import { orderSchema, OrderMongo } from './schemas/order';
import { Order } from '../application/interfaces/order';
import { OrderType } from '../application/enums/orderType';

const orderModel = model<OrderMongo>('Order', orderSchema);

export async function createConnection(): Promise<void> {
    await connect('mongodb://mongodb_container:27017/orders');
}

export async function savePurchase(order: Order): Promise<void> {
    order.tipoOperacion = OrderType.purchase;
    const newSaleOrder = new orderModel(order);
    await newSaleOrder.save();
}

export async function saveSale(order: Order): Promise<void> {
    order.tipoOperacion = OrderType.sale;
    const newSaleOrder = new orderModel(order);
    await newSaleOrder.save();
}

export async function getStock(idProduct: string): Promise<any> {
    return await orderModel.find({ idProducto: { $eq: idProduct } });
}

export async function closeConnection(): Promise<void> {
    await connection.close();
}
