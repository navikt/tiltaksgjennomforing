import React from 'react';
import { shallow } from 'enzyme';
import OtpProsentInput, { toFormattedProsent, toLimit } from './OtpProsentInput';

test('Test at toFormattedProsent skriver default verdi 3.5% når det gis 3.5 som feltverdi', () => {
    expect(toFormattedProsent(toLimit(parseFloat('3.5'), 2, 30))).toEqual('3.5 %');
});
test('Test at toFormattedProsent skriver default verdi 30% når det gis 3+ som feltverdi', () => {
    expect(toFormattedProsent(toLimit(30, 2, 30))).toEqual('30 %');
});
test('Test at toFormattedProsent skriver default verdi 2% når det gis 35 som feltverdi', () => {
    expect(toFormattedProsent(toLimit(35, 2, 30))).toEqual('2 %');
});
test('Test at toFormattedProsent skriver default verdi 2% når det gis 2 som feltverdi', () => {
    expect(toFormattedProsent(toLimit(2, 2, 30))).toEqual('2 %');
});

test('Test at toFormattedProsent skriver default verdi 2% når det gis 1 som feltverdi', () => {
    expect(toFormattedProsent(toLimit(1, 2, 30))).toEqual('2 %');
});

test('Test at toFormattedProsent skriver default verdi 2% når det ingen feltverdi', () => {
    expect(toFormattedProsent(toLimit(undefined, 2, 30))).toEqual('2 %');
});

test('Test at <OtpprosentIput> rendres', () => {
    const wrapper = shallow(<OtpProsentInput label={'OTP Prosent'} />);
    expect(wrapper).toHaveLength(1);
});
