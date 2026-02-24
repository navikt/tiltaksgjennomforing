const numberFormat = new Intl.NumberFormat('nb-NO', { style: 'decimal', maximumFractionDigits: 2 });

export const formaterNorskeTall = (value: string | number | undefined): string | undefined => {
    if (value === undefined) {
        return undefined;
    }
    return !Number.isNaN(Number(value)) ? numberFormat.format(Number(value)) : String(value);
};

export const formaterNorskeTallFraInput = (value: string | number | undefined): string =>
    typeof value === 'string' ? String(value).replace('.', ',') : String(value ?? '');

export const parseNorskeTallFraInput = <T>(value: T): number | undefined => {
    if (typeof value === 'number') {
        return value;
    }
    if (typeof value === 'string' && value !== '') {
        return Number(String(value).replaceAll(/\s/g, '').replace(',', '.'));
    }
    return undefined;
};

export const visTalletEller0 = (tallet?: number) => (tallet === 0 || tallet ? tallet : 0);

export const parseFloatIfFloatable = (verdi: string) => {
    const floatedValue = parseFloat(verdi);
    return !isNaN(floatedValue) ? floatedValue : undefined;
};

export const inputToNumber = (verdi: string | undefined): number | undefined => {
    verdi = verdi?.replace(/,/g, '.');
    if (!isNaN(Number(verdi))) {
        return Number(verdi);
    }

    return undefined;
};
