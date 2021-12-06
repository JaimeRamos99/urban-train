import { healthModule } from './health';
import { purchaseModule } from './newPurchase';
import { saleModule } from './newSale';

export const docs = {
    paths: {
        '/registrar-compra': {
            ...purchaseModule,
        },
        '/registrar-venta': {
            ...saleModule,
        },
        '/health': {
            ...healthModule,
        },
    },
};
