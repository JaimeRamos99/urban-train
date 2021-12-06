import { constants } from '../../../../common/constants';

export const postRequest = {
    post: {
        tags: ['module2'],
        description: 'save a sale transaction',
        parameters: [],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#components/schemas/Transactions',
                    },
                },
            },
        },
        responses: {
            '201': {
                description: constants.responseMessages.sale.successful,
            },
            '400': {
                description: constants.responseMessages.sale.noStock,
            },
            '500': {
                description: constants.responseMessages.general.error,
            },
        },
    },
};
