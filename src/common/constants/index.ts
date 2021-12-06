import { envVars } from '../utils/envVarsHandler';

export const constants = {
    path: {
        docs: `/api/${envVars.VERSION}/api-docs`,
        createPurchase: `/api/${envVars.VERSION}/registrar-compra`,
        createSale: `/api/${envVars.VERSION}/registrar-venta`,
        health: `/api/${envVars.VERSION}/health`,
    },

    joiSchemaOptions: {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
    },

    time: {
        timeZone: 'America/Bogota',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: 'HH:mm:ss',
    },

    responseMessages: {
        general: {
            error: 'something went wrong',
        },
        purchase: {
            successful: 'successful purchase',
            noSlots: 'not enough slots available for this item',
        },
        sale: {
            successful: 'successful sale',
            noStock: 'not enough stocks',
        },
    },
};
