import { modulo1 } from './module1/index';
import { modulo2 } from './module2/index';

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
