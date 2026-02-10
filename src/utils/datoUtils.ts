import {
    differenceInDays,
    format,
    isBefore,
    formatDistanceToNowStrict,
    Duration,
    intervalToDuration,
    differenceInHours,
    isAfter,
} from 'date-fns';
import { nb } from 'date-fns/locale';

export const formaterTimer = (timer: number): string => {
    return `${timer} ${timer === 1 ? 'time' : 'timer'}`;
};

const units: Array<{ unit: keyof Duration; single: string; plural: string }> = [
    { unit: 'years', single: 'år', plural: 'år' },
    { unit: 'months', single: 'måned', plural: 'måneder' },
    { unit: 'days', single: 'dag', plural: 'dager' },
];

export const formaterVarighet = (dato1: Date | string, dato2: Date | string): string => {
    const duration = intervalToDuration({ start: dato1, end: dato2 });
    return units
        .filter(({ unit }) => duration[unit] !== undefined)
        .map(({ unit, single, plural }) => {
            const value = duration[unit] || 0;
            if (value === 1) {
                return `${value} ${single}`;
            } else return `${value} ${plural}`;
        })
        .join(', ');
};

/**
 * Eksempel:
 * `format(new Date('2025-01-10', NORSK_DATO_OG_TID_FORMAT_FULL, {locale: nb}))` => '10. januar 2025 kl. 01:00'
 */
export const NORSK_DATO_OG_TID_FORMAT_FULL = 'PPPp';

export const NORSK_DATO_OG_TID_FORMAT = 'dd.MM.yyyy HH:mm';

/**
 * Eksempel:
 * `format(new Date('2025-01-10', NORSK_DATO_FORMAT, {locale: nb}))` => '10.01.2025'
 */
export const NORSK_DATO_FORMAT = 'dd.MM.yyyy';

/**
 * Eksempel:
 * `format(new Date('2025-01-10', NORSK_DATO_FORMAT_FULL, {locale: nb}))` => '10. januar 2025'
 */
export const NORSK_DATO_FORMAT_FULL = 'PPP';

/**
 * Formater en dato gitt en formateringsstring.
 */
export const formaterDato = (dato: Date | string, formatString: string = NORSK_DATO_OG_TID_FORMAT_FULL) => {
    try {
        if (dato === '-999999999-01-01') return '';
        return format(dato, formatString, { locale: nb });
    } catch (e) {
        return 'Ugyldig dato';
    }
};

/**
 * Formater en (tilskudds)periode gitt en formateringsstring.
 */
export const formaterPeriode = (fra: string, til: string, format: string = NORSK_DATO_FORMAT) => {
    return formaterDato(fra, format) + ' – ' + formaterDato(til, format);
};

export const erDatoTilbakeITid = (dato?: string) => {
    const now = new Date();
    return differenceInDays(dato!, now) < 0 && isBefore(dato!, now);
};

export const visPeriodeForTiltak = (fra?: string, til?: string): string => {
    if (fra && til) return formaterPeriode(fra, til, 'dd.MM.yy');
    if (fra && !til) return formaterDato(fra, 'dd.MM.yy') + ' - sluttdato ikke satt';
    if (!fra && til) return 'startdato ikke satt - ' + formaterDato(til, 'dd.MM.yy');
    return 'ikke satt';
};

export const formaterDatoHvisDefinert = (
    dato?: string | null,
    format: string = NORSK_DATO_FORMAT,
): string | undefined => {
    if (!dato) return undefined;
    const formatertDato = formaterDato(dato, format);
    if (formatertDato === 'Ugyldig dato') {
        return undefined;
    }
    return formatertDato;
};

/**
 * Eksempler:
 * `tidSidenTidspunkt(addDays(new Date(), -5))` => '5 dager'
 * `tidSidenTidspunkt(addHours(new Date(), -5))` => '5 timer'
 * `tidSidenTidspunkt(addYears(new Date(), -5))` => '5 år'
 */
export const tidSidenTidspunkt = (tidspunkt: string | Date) => {
    return formatDistanceToNowStrict(tidspunkt, { locale: nb });
};

/**
 * Eksempler (gitt at nåværende tidspunkt er '2025-01-27 15:00:00'):
 * `tidSidenTidspunktEllerDato('2025-01-27')` => '27.01.2025 01:00'
 * `tidSidenTidspunktEllerDato('2025-01-27 12:00:00')` => '3 timer siden'
 * `tidSidenTidspunktEllerDato('2025-01-28')` => 'om 10 timer'
 */
export const tidSidenTidspunktEllerDato = (tidspunkt: string | Date): string => {
    const now = new Date();
    const hoursSince = differenceInHours(tidspunkt, now);
    const inFuture = isAfter(tidspunkt, now);
    if (Math.abs(hoursSince) > 12) {
        return formaterDato(tidspunkt, NORSK_DATO_OG_TID_FORMAT);
    } else if (inFuture) {
        return 'om ' + tidSidenTidspunkt(tidspunkt);
    }
    return tidSidenTidspunkt(tidspunkt) + ' siden';
};
