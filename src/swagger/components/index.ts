export const appComponents = {
    components: {
        schemas: {
            Transactions: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'An id of transaction (purchase or sale)',
                        minLength: 3,
                        maxLength: 30,
                        example: 'any joi valid string',
                        required: true,
                    },
                    date: {
                        type: 'date',
                        description: 'day on which the transaction took place',
                        format: 'DD/MM/YYYY',
                        example: '14/05/2021',
                        required: true,
                    },
                    time: {
                        type: 'string',
                        description: 'The exact time the transaction took place',
                        length: 8,
                        format: 'HH:mm:ss',
                        example: '20:50:30',
                        required: false,
                    },
                    quantity: {
                        type: 'number',
                        description: 'requested quantity for transaction, must be an integer',
                        minimun: 1,
                        maximum: 30,
                        example: 1,
                        required: false,
                    },
                    productID: {
                        type: 'string',
                        description: 'id of the product',
                        minLength: 3,
                        maxLength: 30,
                        example: 'awsde',
                        required: true,
                    },
                    productName: {
                        type: 'string',
                        description: 'name of the product',
                        minLength: 3,
                        maxLength: 30,
                        example: 'opnd',
                        required: true,
                    },
                },
            },
            ErrorDetails: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        required: true,
                    },
                    field: {
                        type: 'string',
                        required: false,
                    },
                },
            },
            ErrorResponse: {
                type: 'object',
                properties: {
                    error: {
                        type: 'boolean',
                        value: true,
                    },
                    errors: {
                        type: 'Array',
                        items: 'ErrorDetails',
                    },
                },
            },
        },
    },
};
