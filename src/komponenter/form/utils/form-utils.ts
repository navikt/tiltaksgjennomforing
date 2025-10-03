import React from 'react';

export const fromFormatted = (value: any) => {
    return value ? value.replace(',', '.').replace(/[^0-9.]/g, '') + '' : '';
};
export const toNumberOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.value = fromFormatted(event.target.value);
    event.target.type = 'number';
};

export const stepNumber = (current: number, direction: 1 | -1, min?: number, max?: number): number =>
    clamp(current + direction, min, max);

export const clamp = (value: number, min?: number, max?: number): number => {
    if (typeof min === 'number' && value < min) return min;
    if (typeof max === 'number' && value > max) return max;
    return value;
};

export const sanitizeNumericInput = (raw: string): string => raw.replace(/\s/g, '');

export const parseNumericCandidate = (raw: string): number | undefined => {
    if (raw === '' || ['-', ',', '.'].includes(raw)) return undefined;
    const normalized = raw.replace(',', '.');
    const n = Number(normalized);
    return Number.isNaN(n) ? undefined : n;
};

export const isEmptyValue = (v: any): boolean => v === undefined || v === null || v === '';

export const toNumeric = (v: string | number | undefined): number | undefined => {
    if (typeof v === 'number') return Number.isFinite(v) ? v : undefined;
    if (typeof v === 'string' && v.trim() !== '') {
        const n = Number(v);
        return Number.isFinite(n) ? n : undefined;
    }
    return undefined;
};
