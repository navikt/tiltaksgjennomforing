import moment from 'moment';

export const datoIkkeTilbakeITid = (dato: Date) => {
    if (moment().isSameOrBefore(dato, 'date')) {
        return true;
    } else {
        return false;
    }
};
