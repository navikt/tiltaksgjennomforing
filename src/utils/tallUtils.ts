import { erNil } from '@/utils/predicates';

const numberFormat = new Intl.NumberFormat('nb-NO', { style: 'decimal', maximumFractionDigits: 2 });

const kronerFormat = new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency: 'NOK',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

export const NORSK_TELEFONNUMMER_REGEX = /^((\+|00)47)?[1-9]\d{7}$/;

export const parseNorskeTall = (value: unknown): number | undefined => {
    if (typeof value === 'number') {
        return value;
    }
    if (typeof value === 'string' && value !== '') {
        return Number(value.replace(/\s|\s?%|\s?kr/g, '').replace(',', '.'));
    }
    return undefined;
};

export const formaterNorskeTall = (value: string | number | undefined): string | undefined => {
    if (erNil(value)) {
        return undefined;
    }
    const tall = parseNorskeTall(value);
    if (tall === undefined || isNaN(tall)) {
        return String(value);
    }
    return numberFormat.format(tall).replace(/\u2212/g, '-');
};

export const parseProsent = (value: unknown, desimalbrok = false): number | undefined => {
    const tall = parseNorskeTall(value);
    if (tall === undefined || isNaN(tall)) {
        return undefined;
    }
    return desimalbrok ? tall / 100 : tall;
};

export const formaterProsent = (value: string | number | undefined, desimalbrok = false): string | undefined => {
    const tall = parseNorskeTall(value);
    if (tall === undefined || isNaN(tall)) {
        return !erNil(value) ? String(value) : undefined;
    }
    return (formaterNorskeTall(desimalbrok ? tall * 100 : tall) ?? '') + '\u00A0%';
};

export const formaterKroner = (value: string | number | undefined): string | undefined => {
    const tall = parseNorskeTall(value);
    if (tall === undefined || isNaN(tall)) {
        return !erNil(value) ? String(value) : undefined;
    }
    return kronerFormat.format(tall);
};

export const parseNorskeTelefonnummer = (value: unknown): string | undefined => {
    if (typeof value === 'string' && value !== '') {
        const tlf = value.replace(/\s/g, '');
        return NORSK_TELEFONNUMMER_REGEX.test(tlf) ? tlf.replace(/\+47|0047|/, '') : value;
    }
    return undefined;
};

export const formaterNorskeTelefonnummer = (value: string | number | undefined): string | undefined => {
    const tlf = parseNorskeTelefonnummer(value);
    if (erNil(tlf)) {
        return undefined;
    }
    const match = tlf.match(/^(\d{2})(\d{2})(\d{2})(\d{2})$/);
    if (NORSK_TELEFONNUMMER_REGEX.test(tlf) && match) {
        return `+47\u00A0${match[1]}\u00A0${match[2]}\u00A0${match[3]}\u00A0${match[4]}`;
    }
    return tlf;
};

export const parseFloatIfFloatable = (verdi: string) => {
    const floatedValue = parseFloat(verdi);
    return !isNaN(floatedValue) ? floatedValue : undefined;
};

/**
 * @deprecated Bruk `formaterNorskeTall` i stedet. Fjernes i egen opprydnings-PR
 * når alle gjenværende konsumenter (gamle ProsentInput/ValutaInput-brukere) er migrert.
 */
export const formaterNorskeTallFraInput = (value: string | number | undefined): string =>
    typeof value === 'string' ? String(value).replace('.', ',') : String(value ?? '');

/**
 * @deprecated Bruk `parseNorskeTall` i stedet. Fjernes i egen opprydnings-PR
 * når alle gjenværende konsumenter er migrert.
 */
export const parseNorskeTallFraInput = <T>(value: T): number | undefined => {
    if (typeof value === 'number') {
        return value;
    }
    if (typeof value === 'string' && value !== '') {
        return Number(String(value).replaceAll(/\s/g, '').replace(',', '.'));
    }
    return undefined;
};

/**
 * @deprecated Fjernes i egen opprydnings-PR når alle gjenværende konsumenter er migrert.
 */
export const visTalletEller0 = (tallet?: number) => (tallet === 0 || tallet ? tallet : 0);

/**
 * @deprecated Fjernes i egen opprydnings-PR når alle gjenværende konsumenter er migrert.
 */
export const inputToNumber = (verdi: string | undefined): number | undefined => {
    verdi = verdi?.replace(/,/g, '.');
    if (!isNaN(Number(verdi))) {
        return Number(verdi);
    }

    return undefined;
};

/**
 * @deprecated Bruk `parseProsent` i stedet. Fjernes i egen opprydnings-PR
 * når alle gjenværende konsumenter (gamle ProsentInput/ObligatoriskTjenestepensjon) er migrert.
 */
export const parsProsentFraInput = (verdi: string): number | undefined => {
    return verdi === '' ? undefined : parseFloat(verdi) / 100;
};
