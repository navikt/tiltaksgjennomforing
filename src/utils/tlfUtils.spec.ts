import { describe, expect, it } from 'vitest';
import {
    formaterNorskeTelefonnummer,
    NORSK_MOBILNUMMER_REGEX,
    NORSK_TELEFONNUMMER_REGEX,
    parseNorskeTelefonnummer,
    UTENLANDSK_TELEFONNUMMER_REGEX,
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

    it('avviser for langt nummer med +47-prefiks', () => {
        expect(NORSK_TELEFONNUMMER_REGEX.test('+47412345678')).toBe(false);
    });

    it('avviser for langt nummer med 0047-prefiks', () => {
        expect(NORSK_TELEFONNUMMER_REGEX.test('0047412345678')).toBe(false);
    });
});

describe('UTENLANDSK_TELEFONNUMMER_REGEX', () => {
    it('godtar spansk nummer med +34', () => {
        expect(UTENLANDSK_TELEFONNUMMER_REGEX.test('+34636263227')).toBe(true);
    });

    it('godtar svensk nummer med +46', () => {
        expect(UTENLANDSK_TELEFONNUMMER_REGEX.test('+4612345678')).toBe(true);
    });

    it('godtar britisk nummer med +44', () => {
        expect(UTENLANDSK_TELEFONNUMMER_REGEX.test('+441234567890')).toBe(true);
    });

    it('godtar nummer med 00-prefiks og utenlandsk landkode', () => {
        expect(UTENLANDSK_TELEFONNUMMER_REGEX.test('0034636263227')).toBe(true);
    });

    it('avviser norsk nummer med +47', () => {
        expect(UTENLANDSK_TELEFONNUMMER_REGEX.test('+4741234567')).toBe(false);
    });

    it('avviser norsk nummer med 0047', () => {
        expect(UTENLANDSK_TELEFONNUMMER_REGEX.test('004741234567')).toBe(false);
    });

    it('avviser ugyldig norsk nummer med +47 og for mange siffer', () => {
        expect(UTENLANDSK_TELEFONNUMMER_REGEX.test('+47412345678')).toBe(false);
    });

    it('avviser ugyldig norsk nummer med 0047 og for mange siffer', () => {
        expect(UTENLANDSK_TELEFONNUMMER_REGEX.test('0047412345678')).toBe(false);
    });

    it('avviser nummer uten landkodeprefiks', () => {
        expect(UTENLANDSK_TELEFONNUMMER_REGEX.test('41234567')).toBe(false);
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

    it('fjerner mellomrom fra vilkårlig streng', () => {
        expect(parseNorskeTelefonnummer('abc def')).toBe('abcdef');
    });

    it('fjerner mellomrom fra utenlandsk nummer men beholder landkode', () => {
        expect(parseNorskeTelefonnummer('+34 636 263 227')).toBe('+34636263227');
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
