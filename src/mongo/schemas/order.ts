import { Schema, Document } from 'mongoose';
import { OrderType } from '../../application/enums/orderType';
import { getCurrentDate, getCurrentTime } from '../../common/utils/getTime';

interface OrderMongo extends Document {
    id: string;
    fecha: string;
    hora?: string;
    cantidad: number;
    idProducto: string;
    nombreProducto: string;
    tipoOperacion?: OrderType;
}

const orderSchema = new Schema({
    id: { type: String, required: true },
    fecha: { type: String, required: true, default: getCurrentDate() },
    hora: { type: String, default: getCurrentTime() },
    cantidad: { type: Number, required: true },
    idProducto: { type: String, required: true },
    nombreProducto: { type: String, required: true },
    tipoOperacion: { type: String, enum: OrderType },
});

export { orderSchema, OrderMongo };
