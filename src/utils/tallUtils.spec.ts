import { describe, expect, test } from 'vitest';
import { formaterNorskeTall, parseNorskeTall } from './tallUtils';

describe('parseNorskeTall', () => {
    test('returnerer number uendret', () => {
        expect(parseNorskeTall(50.5)).toBe(50.5);
    });

    test('parser streng med punktum som desimalskilletegn', () => {
        expect(parseNorskeTall('50.5')).toBe(50.5);
    });

    test('parser streng med komma som desimalskilletegn', () => {
        expect(parseNorskeTall('50,5')).toBe(50.5);
    });

    test('fjerner mellomrom', () => {
        expect(parseNorskeTall('1 000')).toBe(1000);
    });

    test('fjerner prosenttegn med mellomrom', () => {
        expect(parseNorskeTall('50,5 %')).toBe(50.5);
    });

    test('fjerner prosenttegn uten mellomrom', () => {
        expect(parseNorskeTall('50,5%')).toBe(50.5);
    });

    test('returnerer undefined for tom streng', () => {
        expect(parseNorskeTall('')).toBeUndefined();
    });

    test('returnerer undefined for undefined', () => {
        expect(parseNorskeTall(undefined)).toBeUndefined();
    });
});

describe('formaterNorskeTall', () => {
    test('returnerer undefined for undefined', () => {
        expect(formaterNorskeTall(undefined)).toBeUndefined();
    });

    test('formaterer number til norsk format', () => {
        expect(formaterNorskeTall(1000)).toBe('1\u00a0000');
    });

    test('formaterer desimaltall med komma', () => {
        expect(formaterNorskeTall(50.5)).toBe('50,5');
    });

    test('parser norsk streng med komma og formaterer', () => {
        expect(formaterNorskeTall('50,5')).toBe('50,5');
    });

    test('parser streng med punktum og formaterer', () => {
        expect(formaterNorskeTall('50.5')).toBe('50,5');
    });

    test('returnerer ugyldig streng uendret', () => {
        expect(formaterNorskeTall('abc')).toBe('abc');
    });

    test('runder av til maks 2 desimaler', () => {
        expect(formaterNorskeTall(1.999)).toBe('2');
        expect(formaterNorskeTall(1.994)).toBe('1,99');
    });
});
