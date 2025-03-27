import { describe, expect, test } from 'vitest';
import isEquall from 'lodash/isEqual';
import isEqual from 'fast-deep-equal';

describe('Test for å sjekke att den nye fast-deep-equal gir samme resultat som lodash.isEqual', () => {
    test('should return the same result for simple objects', () => {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { a: 1, b: 2 };
        isEqual(obj1, obj2);

        console.log(isEqual(obj1, obj2));

        expect(isEquall(obj1, obj2)).toBe(true);
        expect(isEqual(obj1, obj2)).toBe(true);
    });

    test('should return the same result for nested objects', () => {
        const obj1 = { a: { b: 2 } };
        const obj2 = { a: { b: 2 } };

        expect(isEquall(obj1, obj2)).toBe(true);
        expect(isEqual(obj1, obj2)).toBe(true);
    });

    test('should return the same result for different objects', () => {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { a: 1, b: 3 };

        expect(isEquall(obj1, obj2)).toBe(false);
        expect(isEqual(obj1, obj2)).toBe(false);
    });
});

describe('Test fast-deep-equal gjør som den ska', () => {
    test('should return true for deeply equal objects', () => {
        const obj1 = { a: 1, b: { c: 2 } };
        const obj2 = { a: 1, b: { c: 2 } };

        expect(isEqual(obj1, obj2)).toBe(true);
    });

    test('should return false for objects with different types', () => {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { a: 1, b: '2' };

        expect(isEqual(obj1, obj2)).toBe(false);
    });

    test('should return false for objects with different structures', () => {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { a: 1, b: 2, c: 3 };

        expect(isEqual(obj1, obj2)).toBe(false);
    });
});
