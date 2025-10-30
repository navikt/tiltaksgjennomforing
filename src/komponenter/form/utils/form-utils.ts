import React from 'react';

export const fromFormatted = (value: any) => {
    return value ? value.replace(',', '.').replace(/[^0-9.]/g, '') + '' : '';
};
export const toNumberOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.value = fromFormatted(event.target.value);
    event.target.type = 'number';
};

export const clamp = (value: number, min?: number, max?: number): number => {
    if (typeof min === 'number' && value < min) return min;
    if (typeof max === 'number' && value > max) return max;
    return value;
};

export const parseNumericCandidate = (input: string): number | undefined => {
    if (!input || input.trim() === '') return undefined;

    // Remove normal + non-breaking spaces
    let cleaned = input.replace(/[\s\u00A0]/g, '');

    // Replace comma with dot for decimal separator
    cleaned = cleaned.replace(',', '.');

    // Handle in-progress typing
    if (/^[-.]$/.test(cleaned)) return undefined; // "-" or "."
    if (/^-?\d+\.$/.test(cleaned)) return Number(cleaned.slice(0, -1)); // "3." → 3

    const n = Number(cleaned);
    return Number.isFinite(n) ? n : undefined;
};

export const isEmptyValue = (v: any): boolean => v === undefined || v === null || v === '';
