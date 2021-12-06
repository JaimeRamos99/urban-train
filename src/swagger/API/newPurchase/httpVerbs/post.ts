import { constants } from '../../../../common/constants';

export const postRequest = {
    post: {
        tags: ['purchase'],
        description: 'save a purchase transaction',
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
                description: constants.responseMessages.purchase.successful,
            },
            '400': {
                description: constants.responseMessages.purchase.noSlots,
            },
            '500': {
                description: constants.responseMessages.general.error,
            },
        },
    },
};
