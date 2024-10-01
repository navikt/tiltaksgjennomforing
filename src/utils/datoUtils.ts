import moment from 'moment';
import 'moment/dist/locale/nb';
moment.locale('nb');

export const datoIkkeTilbakeITid = (dato: Date) => {
    return moment().isSameOrBefore(dato, 'date');
};
const units: Array<{ unit: moment.unitOfTime.Base; key: moment.RelativeTimeKey }> = [
    { unit: 'y', key: 'yy' },
    { unit: 'M', key: 'MM' },
    { unit: 'd', key: 'dd' },
    { unit: 'h', key: 'hh' },
    { unit: 'm', key: 'mm' },
    { unit: 's', key: 'ss' },
];
export const accurateHumanize = (duration: moment.Duration, accuracy: number = 2): string => {
    let beginFilter = false;
    let componentCount = 0;
    return units
        .map(({ unit, key }) => ({ value: duration.get(unit), key }))
        .filter(({ value, key }) => {
            if (beginFilter === false) {
                if (value === 0) return false;
                beginFilter = true;
            }
            componentCount++;
            return value !== 0 && componentCount <= accuracy;
        })
        .map(({ value, key }) => ({ value, key: value === 1 ? key[0] : key }))
        .map(({ value, key }) => moment.localeData().relativeTime(value, true, key as moment.RelativeTimeKey, true))
        .join(', ');
};

export const NORSK_DATO_OG_TID_FORMAT = 'DD.MM.YYYY HH:mm';
export const NORSK_DATO_FORMAT = 'DD.MM.YYYY';

export const formatterDato = (dato: string, format: string = NORSK_DATO_OG_TID_FORMAT) => {
    try {
        if (dato === '-999999999-01-01') return '';
        const formattertDato = moment(dato).format(format);
        return !formattertDato.includes('NaN') ? formattertDato : dato;
    } catch (e) {
        return dato;
    }
};

export const formatterPeriode = (fra: string, til: string, format: string = NORSK_DATO_FORMAT) => {
    return formatterDato(fra, format) + ' – ' + formatterDato(til, format);
};

export const erDatoTilbakeITid = (dato?: string) => moment(dato).diff(moment(), 'days') < 0;

export const visPeriodeForTiltak = (fra?: string, til?: string): string => {
    if (fra && til) return formatterPeriode(fra, til, 'DD.MM.YY');
    if (fra && !til) return formatterDato(fra, 'DD.MM.YY') + ' - sluttdato ikke satt';
    if (!fra && til) return 'startdato ikke satt - ' + formatterDato(til, 'DD.MM.YY');
    return 'ikke satt';
};

export const formatterDatoHvisDefinert = (dato?: string, format: string = NORSK_DATO_FORMAT) => {
    if (!dato) return '';
    const formattertDato = formatterDato(dato, format);
    if (formattertDato === 'Invalid date') {
        return dato;
    }
    return formatterDato(dato, format);
};

export const formaterTid = (tidspunkt: string) => {
    const antallTimerSiden = moment(moment()).diff(tidspunkt, 'hours');
    if (antallTimerSiden > 12) {
        return formatterDato(tidspunkt);
    } else {
        return moment(tidspunkt).fromNow();
    }
};
