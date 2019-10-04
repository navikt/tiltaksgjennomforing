import moment from 'moment';

export const datoIkkeTilbakeITid = (dato: Date) => {
    return moment().isSameOrBefore(dato, 'date');
};
