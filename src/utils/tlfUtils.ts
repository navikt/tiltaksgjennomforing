export const NORSK_TELEFONNUMMER_REGEX = /^((\+|00)47)?[1-9]\d{7}$/;
export const NORSK_MOBILNUMMER_REGEX = /^((\+|00)47)?(4|9)\d{7}$/;

export const parseNorskeTelefonnummer = (value: unknown): string | undefined => {
    if ((typeof value === 'string' || typeof value === 'number') && value !== '') {
        const tlf = String(value).replace(/\s/g, '');
        return NORSK_TELEFONNUMMER_REGEX.test(tlf) ? tlf.replace(/\+47|0047|/, '') : String(value);
    }
    return undefined;
};

export const formaterNorskeTelefonnummer = (value: string | undefined): string | undefined => {
    return parseNorskeTelefonnummer(value) ?? value;
};
