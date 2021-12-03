import moment from 'moment';

export function calculateRedisTTL() {
    const dateTo = moment().endOf('month').valueOf();
    const expire = dateTo / 1000;
    return expire;
}
