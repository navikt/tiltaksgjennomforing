import { describe, expect, test } from 'vitest';
import { formaterPenger, parsePenger } from './pengeUtils';

describe('formaterPenger', () => {
    test('formaterer heltall til norsk kroneformat', () => {
        expect(formaterPenger(1000)).toBe('1\u00a0000\u00a0kr');
    });

    test('formaterer desimaltall uten øre', () => {
        expect(formaterPenger(1000.5)).toBe('1\u00a0001\u00a0kr');
    });

    test('formaterer streng med norsk komma', () => {
        expect(formaterPenger('1000,50')).toBe('1\u00a0001\u00a0kr');
    });

    test('returnerer undefined for undefined uten fallback', () => {
        expect(formaterPenger(undefined)).toBeUndefined();
    });

    test('returnerer fallback for undefined når fallback er oppgitt', () => {
        expect(formaterPenger(undefined, '—')).toBe('—');
    });

    test('returnerer ugyldig streng uendret', () => {
        expect(formaterPenger('abc')).toBe('abc');
    });

    test('formaterer 0', () => {
        expect(formaterPenger(0)).toBe('0\u00a0kr');
    });

    test('formaterer negativt beløp', () => {
        expect(formaterPenger(-500)).toBe('-500\u00a0kr');
    });
});

describe('parsePenger', () => {
    test('parser number uendret', () => {
        expect(parsePenger(1000)).toBe(1000);
    });

    test('parser streng med norsk komma', () => {
        expect(parsePenger('1000,50')).toBe(1000.5);
    });

    test('parser streng med kr-suffiks', () => {
        expect(parsePenger('1\u00a0000\u00a0kr')).toBe(1000);
    });

    test('returnerer undefined for undefined', () => {
        expect(parsePenger(undefined)).toBeUndefined();
    });

    test('returnerer undefined for tom streng', () => {
        expect(parsePenger('')).toBeUndefined();
    });
});
