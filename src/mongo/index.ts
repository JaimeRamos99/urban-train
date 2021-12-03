import { model, connect } from 'mongoose';
import { orderSchema, OrderMongo } from './schemas/order';
import { Order } from '../application/interfaces/order';
import { OrderType } from '../application/enums/orderType';

const orderModel = model<OrderMongo>('Order', orderSchema);

export async function createConnection() {
    await connect('mongodb://mongodb_container:27017/orders');
}

export async function savePurchase(order: Order) {
    order.tipoOperacion = OrderType.purchase;
    const newSaleOrder = new orderModel(order);
    await newSaleOrder.save();
}

export async function saveSale(order: Order) {
    order.tipoOperacion = OrderType.sale;
    const newSaleOrder = new orderModel(order);
    await newSaleOrder.save();
}
