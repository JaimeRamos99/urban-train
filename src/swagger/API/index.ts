import { purchaseModule } from './newPurchase/index';
import { saleModule } from './newSale/index';

export const docs = {
    paths: {
        '/registrar-compra': {
            ...purchaseModule,
        },
        '/registrar-venta': {
            ...saleModule,
        },
    },
};
