import { constants } from '../../../../common/constants';

export const getRequest = {
    get: {
        tags: ['health'],
        description: 'health endpoint',
        parameters: [],
        requestBody: {},
        responses: {
            '200': {
                description: 'uptime, OK as message and date',
            },
            '500': {
                description: constants.responseMessages.general.error,
            },
        },
    },
};
