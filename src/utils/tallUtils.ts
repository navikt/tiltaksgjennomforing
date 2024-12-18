const numberFormat = new Intl.NumberFormat('nb-NO', { style: 'decimal', maximumFractionDigits: 2 });

export const formaterNorskeTall = <T>(value: T): string | T =>
    typeof value === 'number' && !Number.isNaN(value) ? numberFormat.format(Number(value)) : value;

export const formaterNorskeTallFraInput = <T>(value: T): string | T =>
    typeof value === 'string' ? String(value).replace('.', ',') : value;

export const parseNorskeTallFraInput = <T>(value: T): number | T =>
    typeof value === 'string' ? Number(String(value).replaceAll(/\s/g, '').replace(',', '.')) : value;

export const visTalletEller0 = (tallet?: number) => (tallet === 0 || tallet ? tallet : 0);

export const parseFloatIfFloatable = (verdi: string) => {
    const floatedValue = parseFloat(verdi);
    return !isNaN(floatedValue) ? floatedValue : undefined;
};
