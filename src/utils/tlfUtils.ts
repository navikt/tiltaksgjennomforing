export const NORSK_TELEFONNUMMER_REGEX = /^((\+|00)47)?[1-9]\d{7}$/;
export const NORSK_MOBILNUMMER_REGEX = /^((\+|00)47)?(4|9)\d{7}$/;
// Utenlandske nummer: +/00-prefiks påkrevd og etterfulgt av 7–15 siffer.
export const UTENLANDSK_TELEFONNUMMER_REGEX = /^(\+|00)[1-9]\d{6,14}$/;

const harLandkodePrefiks = (tlf: string): boolean => /^(\+|00)/.test(tlf);
const harNorskLandkode = (tlf: string): boolean => /^(\+|00)47/.test(tlf);

export const erGyldigTelefonnummer = (value: unknown): boolean => {
    if (typeof value !== 'string' && typeof value !== 'number') {
        return false;
    }
    const tlf = String(value).replace(/\s/g, '');
    if (tlf === '') {
        return false;
    }
    if (!harLandkodePrefiks(tlf) || harNorskLandkode(tlf)) {
        return NORSK_TELEFONNUMMER_REGEX.test(tlf);
    }
    return UTENLANDSK_TELEFONNUMMER_REGEX.test(tlf);
};

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
