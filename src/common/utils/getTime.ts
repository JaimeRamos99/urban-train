import moment from 'moment-timezone';
import { constants } from '../constants';

export function getCurrentDate() {
    return moment.tz(constants.time.timeZone).format(constants.time.dateFormat);
}

export function getCurrentTime() {
    return moment.tz(constants.time.timeZone).format(constants.time.timeFormat);
}
