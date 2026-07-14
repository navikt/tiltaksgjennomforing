import { describe, expect, it } from 'vitest';
import {
    erGyldigTelefonnummer,
    formaterNorskeTelefonnummer,
    NORSK_MOBILNUMMER_REGEX,
    NORSK_TELEFONNUMMER_REGEX,
    parseNorskeTelefonnummer,
} from './tlfUtils';

describe('NORSK_TELEFONNUMMER_REGEX', () => {
    it('godtar 8-sifret nummer uten landkode', () => {
        expect(NORSK_TELEFONNUMMER_REGEX.test('21234567')).toBe(true);
    });

    it('godtar nummer med +47', () => {
        expect(NORSK_TELEFONNUMMER_REGEX.test('+4721234567')).toBe(true);
    });

    it('godtar nummer med 0047', () => {
        expect(NORSK_TELEFONNUMMER_REGEX.test('004721234567')).toBe(true);
    });

    it('avviser nummer som starter med 0', () => {
        expect(NORSK_TELEFONNUMMER_REGEX.test('01234567')).toBe(false);
    });

    it('avviser for kort nummer', () => {
        expect(NORSK_TELEFONNUMMER_REGEX.test('1234567')).toBe(false);
    });

    it('avviser for langt nummer', () => {
        expect(NORSK_TELEFONNUMMER_REGEX.test('212345678')).toBe(false);
    });
});

describe('NORSK_MOBILNUMMER_REGEX', () => {
    it('godtar nummer som starter med 4', () => {
        expect(NORSK_MOBILNUMMER_REGEX.test('41234567')).toBe(true);
    });

    it('godtar nummer som starter med 9', () => {
        expect(NORSK_MOBILNUMMER_REGEX.test('91234567')).toBe(true);
    });

    it('godtar mobilnummer med +47', () => {
        expect(NORSK_MOBILNUMMER_REGEX.test('+4741234567')).toBe(true);
    });

    it('godtar mobilnummer med 0047', () => {
        expect(NORSK_MOBILNUMMER_REGEX.test('004741234567')).toBe(true);
    });

    it('avviser fast telefon som starter med 2', () => {
        expect(NORSK_MOBILNUMMER_REGEX.test('21234567')).toBe(false);
    });

    it('avviser nummer med for mange siffer uten landkode', () => {
        expect(NORSK_MOBILNUMMER_REGEX.test('412345678')).toBe(false);
    });

    it('avviser nummer med for mange siffer med +47', () => {
        expect(NORSK_MOBILNUMMER_REGEX.test('+47412345678')).toBe(false);
    });

    it('avviser nummer med for mange siffer med 0047', () => {
        expect(NORSK_MOBILNUMMER_REGEX.test('0047412345678')).toBe(false);
    });

    it('avviser nummer med spesialtegn', () => {
        expect(NORSK_MOBILNUMMER_REGEX.test('4123456!')).toBe(false);
    });
});

describe('erGyldigTelefonnummer', () => {
    it('godtar norsk 8-sifret nummer uten landkode', () => {
        expect(erGyldigTelefonnummer('21234567')).toBe(true);
    });

    it('godtar norsk mobilnummer uten landkode', () => {
        expect(erGyldigTelefonnummer('41234567')).toBe(true);
    });

    it('godtar norsk nummer med mellomrom', () => {
        expect(erGyldigTelefonnummer('412 34 567')).toBe(true);
    });

    it('godtar norsk nummer med +47', () => {
        expect(erGyldigTelefonnummer('+4741234567')).toBe(true);
    });

    it('godtar norsk nummer med 0047', () => {
        expect(erGyldigTelefonnummer('004741234567')).toBe(true);
    });

    it('avviser norsk nummer med feil lengde', () => {
        expect(erGyldigTelefonnummer('4123456')).toBe(false);
    });

    it('avviser norsk nummer med for mange siffer', () => {
        expect(erGyldigTelefonnummer('412345678')).toBe(false);
    });

    it('avviser norsk nummer med for mange siffer selv med +47', () => {
        expect(erGyldigTelefonnummer('+47412345678')).toBe(false);
    });

    it('avviser norsk nummer som starter med 0', () => {
        expect(erGyldigTelefonnummer('01234567')).toBe(false);
    });

    it('godtar utenlandsk nummer med +', () => {
        expect(erGyldigTelefonnummer('+34636263227')).toBe(true);
    });

    it('godtar utenlandsk nummer med 00', () => {
        expect(erGyldigTelefonnummer('004915123456789')).toBe(true);
    });

    it('avviser utenlandsk nummer uten landkodeprefiks', () => {
        expect(erGyldigTelefonnummer('34636263227')).toBe(false);
    });

    it('avviser nummer med spesialtegn', () => {
        expect(erGyldigTelefonnummer('+34 636!')).toBe(false);
    });

    it('avviser for langt nummer', () => {
        expect(erGyldigTelefonnummer('+1234567890123456')).toBe(false);
    });

    it('avviser tom streng', () => {
        expect(erGyldigTelefonnummer('')).toBe(false);
    });

    it('avviser undefined', () => {
        expect(erGyldigTelefonnummer(undefined)).toBe(false);
    });
});

describe('parseNorskeTelefonnummer', () => {
    it('returnerer undefined for undefined', () => {
        expect(parseNorskeTelefonnummer(undefined)).toBeUndefined();
    });

    it('returnerer undefined for null', () => {
        expect(parseNorskeTelefonnummer(null)).toBeUndefined();
    });

    it('returnerer undefined for tom streng', () => {
        expect(parseNorskeTelefonnummer('')).toBeUndefined();
    });

    it('fjerner mellomrom og returnerer gyldig nummer', () => {
        expect(parseNorskeTelefonnummer('212 34 567')).toBe('21234567');
    });

    it('fjerner +47-prefiks fra gyldig nummer', () => {
        expect(parseNorskeTelefonnummer('+4721234567')).toBe('21234567');
    });

    it('fjerner 0047-prefiks fra gyldig nummer', () => {
        expect(parseNorskeTelefonnummer('004721234567')).toBe('21234567');
    });

    it('returnerer ugyldig nummer uendret', () => {
        expect(parseNorskeTelefonnummer('abc')).toBe('abc');
    });

    it('beholder vilkårlig streng med mellomrom uendret', () => {
        expect(parseNorskeTelefonnummer('abc def')).toBe('abc def');
    });

    it('beholder utenlandsk nummer uendret', () => {
        expect(parseNorskeTelefonnummer('+34 636 263 227')).toBe('+34 636 263 227');
    });

    it('håndterer number-type som input', () => {
        expect(parseNorskeTelefonnummer(21234567)).toBe('21234567');
    });

    it('returnerer undefined for boolsk verdi', () => {
        expect(parseNorskeTelefonnummer(true)).toBeUndefined();
    });
});

describe('formaterNorskeTelefonnummer', () => {
    it('returnerer formatert gyldig nummer', () => {
        expect(formaterNorskeTelefonnummer('21234567')).toBe('21234567');
    });

    it('fjerner mellomrom og returnerer formatert nummer', () => {
        expect(formaterNorskeTelefonnummer('212 34 567')).toBe('21234567');
    });

    it('fjerner +47-prefiks', () => {
        expect(formaterNorskeTelefonnummer('+4721234567')).toBe('21234567');
    });

    it('returnerer ugyldig streng uendret', () => {
        expect(formaterNorskeTelefonnummer('abc')).toBe('abc');
    });

    it('returnerer undefined for undefined', () => {
        expect(formaterNorskeTelefonnummer(undefined)).toBeUndefined();
    });
});
