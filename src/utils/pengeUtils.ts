import { erNil } from './predicates';
import { parseNorskeTall } from '@/utils/tallUtils';

export const IKKE_NOE_BELOP_TEGN = '—';

const pengerFormat = new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency: 'NOK',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

export function formaterPenger(value: number, fallback?: string): string;
export function formaterPenger(value: string | number | undefined, fallback: string): string;
export function formaterPenger(value: string | number | undefined, fallback?: undefined): string | undefined;
export function formaterPenger(value: string | number | undefined, fallback?: string): string | undefined {
    const tall = parseNorskeTall(value);
    if (tall === undefined || isNaN(tall)) {
        return !erNil(value) ? String(value) : fallback;
    }
    return pengerFormat.format(tall).replace(/\u2212/g, '-');
}

export const parsePenger = (value: unknown): number | undefined => {
    return parseNorskeTall(value);
};
