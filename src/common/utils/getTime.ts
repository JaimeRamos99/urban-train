import moment from 'moment-timezone';

export function getCurrentDate() {
    return moment.tz('America/Bogota').format('DD/MM/YYYY');
}

export function getCurrentTime() {
    return moment.tz('America/Bogota').format('HH:mm:ss');
}
