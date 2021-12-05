import moment from 'moment-timezone';
import { constants } from '../constants';

export function calculateRedisTTL() {
    // GMT
    const GMTEndMonth = moment().endOf('month');
    const GMTNow = moment();

    // COT
    const COTEndMonth = GMTEndMonth.tz(constants.time.timeZone);
    const COTNow = GMTNow.tz(constants.time.timeZone);

    // COT timestamps
    const COTtimestampEndMonth = COTEndMonth.valueOf();
    const COTtimestampNow = COTNow.valueOf();

    const expire = Math.round(COTtimestampEndMonth - COTtimestampNow);
    return expire;
}
