import { describe, expect, test } from 'vitest';
import { formaterProsent, parseProsent } from './prosentUtils';

describe('parseProsent', () => {
    test('returnerer number uendret', () => {
        expect(parseProsent(50)).toBe(50);
    });

    test('parser streng med komma som desimalskilletegn', () => {
        expect(parseProsent('50,5')).toBe(50.5);
    });

    test('parser prosentstreng', () => {
        expect(parseProsent('50,5 %')).toBe(50.5);
        expect(parseProsent('50.5%')).toBe(50.5);
    });

    test('returnerer desimalbrøk når desimalbrok er true', () => {
        expect(parseProsent(50, true)).toBe(0.5);
        expect(parseProsent('25,5', true)).toBe(0.255);
    });

    test('returnerer undefined for ugyldig verdi', () => {
        expect(parseProsent('abc')).toBeUndefined();
        expect(parseProsent(undefined)).toBeUndefined();
        expect(parseProsent('')).toBeUndefined();
    });
});

describe('formaterProsent', () => {
    test('formaterer number til prosentstreng', () => {
        expect(formaterProsent(50)).toBe('50\u00A0%');
    });

    test('formaterer desimaltall', () => {
        expect(formaterProsent(50.5)).toBe('50,5\u00A0%');
    });

    test('re-formaterer eksisterende prosentstreng', () => {
        expect(formaterProsent('50,5 %')).toBe('50,5\u00A0%');
        expect(formaterProsent('50.5%')).toBe('50,5\u00A0%');
    });

    test('returnerer undefined for undefined', () => {
        expect(formaterProsent(undefined)).toBeUndefined();
    });

    test('returnerer ugyldig verdi som streng', () => {
        expect(formaterProsent('abc')).toBe('abc');
    });

    test('konverterer desimalbrøk til prosentstreng når desimalbrok er true', () => {
        expect(formaterProsent(0.5, true)).toBe('50\u00A0%');
        expect(formaterProsent(0.505, true)).toBe('50,5\u00A0%');
    });
});
