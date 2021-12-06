import { healthModule } from './health';
import { purchaseModule } from './newPurchase';
import { saleModule } from './newSale';

export const docs = {
    paths: {
        '/api/v1/registrar-compra': {
            ...purchaseModule,
        },
        '/api/v1/registrar-venta': {
            ...saleModule,
        },
        '/api/v1/health': {
            ...healthModule,
        },
    },
};
