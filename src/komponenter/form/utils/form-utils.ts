import React from 'react';

export const fromFormatted = (value: any) => {
    return value ? value.replace(',', '.').replace(/[^0-9.]/g, '') + '' : '';
};

export const clamp = (value: number, min?: number, max?: number): number => {
    if (typeof min === 'number' && value < min) return min;
    if (typeof max === 'number' && value > max) return max;
    return value;
};

export const sanitizeNumericInput = (raw: string): string => raw.replace(/\s/g, '');

export const parseNumericCandidate = (raw: string): number | undefined => {
    if (!raw) return undefined;
    const cleaned = raw.replace(/\s/g, '');

    // In‑progress lone chars
    if (/^[-.,]$/.test(cleaned)) return undefined;

    // Integer + trailing separator
    if (/^-?\d+[.,]$/.test(cleaned)) {
        return Number(cleaned.slice(0, -1));
    }

    // Strip single trailing separator if any
    const core = /[.,]$/.test(cleaned) ? cleaned.slice(0, -1) : cleaned;
    if (core === '' || core === '-') return undefined;

    const normalized = core.replace(',', '.');
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
