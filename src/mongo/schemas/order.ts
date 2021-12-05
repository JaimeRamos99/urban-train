import { Schema, Document } from 'mongoose';
import { OrderType } from '../../application/enums/orderType';
import { getCurrentDate, getCurrentTime } from '../../common/utils/getTime';

interface OrderMongo extends Document {
    id: string;
    date: string;
    time?: string;
    quantity: number;
    productID: string;
    productName: string;
    orderType?: OrderType;
}

const orderSchema = new Schema({
    id: { type: String, required: true },
    date: { type: String, required: true, default: getCurrentDate() },
    time: { type: String, default: getCurrentTime() },
    quantity: { type: Number, required: true },
    productID: { type: String, index: true, required: true },
    productName: { type: String, required: true },
    orderType: { type: String, enum: OrderType },
});

export { orderSchema, OrderMongo };
