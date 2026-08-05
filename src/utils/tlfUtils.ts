export const NORSK_TELEFONNUMMER_REGEX = /^((\+|00)47)?[1-9]\d{7}$/;
export const NORSK_MOBILNUMMER_REGEX = /^((\+|00)47)?(4|9)\d{7}$/;
// Utenlandske nummer: +/00-prefiks påkrevd og etterfulgt av 7–15 siffer.
export const UTENLANDSK_TELEFONNUMMER_REGEX = /^(\+|00)[1-9]\d{6,14}$/;

export const parseNorskeTelefonnummer = (value: unknown): string | undefined => {
    if ((typeof value === 'string' || typeof value === 'number') && value !== '') {
        const tlf = String(value).replace(/\s/g, '');
        return NORSK_TELEFONNUMMER_REGEX.test(tlf) ? tlf.replace(/^(\+47|0047)/, '') : tlf;
    }
    return undefined;
};

export const formaterNorskeTelefonnummer = (value: string | undefined): string | undefined => {
    return parseNorskeTelefonnummer(value) ?? value;
};
