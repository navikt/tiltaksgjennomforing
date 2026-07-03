import React from 'react';

const fromFormatted = (value: any) => {
    return value ? value.replace(',', '.').replace(/[^0-9.]/g, '') + '' : '';
};
export const toNumberOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.value = fromFormatted(event.target.value);
    event.target.type = 'number';
};
