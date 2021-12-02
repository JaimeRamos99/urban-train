import mongoose from 'mongoose';
import { getCurrentDate, getCurrentTime } from '../../common/utils/getTime';
const { Schema } = mongoose;

const orderSchema = new Schema({
    id: { type: String },
    fecha: { type: String, default: getCurrentDate() },
    hora: { type: String, default: getCurrentTime() },
    cantidad: { type: Number },
    idProducto: { type: String },
    nombreProducto: { type: String },
});

export { orderSchema };
