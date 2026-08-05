import { erNil } from '@/utils/predicates';

const numberFormat = new Intl.NumberFormat('nb-NO', { style: 'decimal', maximumFractionDigits: 2 });

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

export const parseFloatIfFloatable = (verdi: string) => {
    const floatedValue = parseFloat(verdi);
    return !isNaN(floatedValue) ? floatedValue : undefined;
};
