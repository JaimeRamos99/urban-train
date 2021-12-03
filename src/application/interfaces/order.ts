import { OrderType } from '../enums/orderType';

export interface Order {
    id: string;
    fecha: string;
    hora?: string;
    cantidad: number;
    idProducto: string;
    nombreProducto: string;
    tipoOperacion?: OrderType;
}
