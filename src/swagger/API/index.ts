import { modulo1 } from './newPurchase/index';
import { modulo2 } from './newSale/index';

export const docs = {
    paths: {
        '/registrar-compra': {
            ...modulo1,
        },
        '/registrar-venta': {
            ...modulo2,
        },
    },
};
