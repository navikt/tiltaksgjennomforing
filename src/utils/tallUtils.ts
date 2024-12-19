const numberFormat = new Intl.NumberFormat('nb-NO', { style: 'decimal', maximumFractionDigits: 2 });

export const formaterNorskeTall = (value: string | number | undefined): string | undefined => {
    if (value === undefined) {
        return undefined;
    }
    return !Number.isNaN(Number(value)) ? numberFormat.format(Number(value)) : String(value);
};

export const formaterNorskeTallFraInput = (value: string | number | undefined): string =>
    typeof value === 'string' ? String(value).replace('.', ',') : String(value ?? '');

export const parseNorskeTallFraInput = <T>(value: T): number | undefined =>
    typeof value === 'string' && value !== ''
        ? Number(String(value).replaceAll(/\s/g, '').replace(',', '.'))
        : undefined;

export const visTalletEller0 = (tallet?: number) => (tallet === 0 || tallet ? tallet : 0);

export const parseFloatIfFloatable = (verdi: string) => {
    const floatedValue = parseFloat(verdi);
    return !isNaN(floatedValue) ? floatedValue : undefined;
};
