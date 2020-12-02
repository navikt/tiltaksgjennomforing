import React from 'react';
import { shallow } from 'enzyme';
import { OtpProsentInput, toFormattedProsent } from './OtpProsentInput';

test('Test at toFormattedProsent skriver default verdi 30% når det gis 3+ som feltverdi', () => {
    expect(toFormattedProsent(30, 2, 30)).toEqual('30 %');
});
test('Test at toFormattedProsent skriver default verdi 2% når det gis 35 som feltverdi', () => {
    expect(toFormattedProsent(35, 2, 30)).toEqual('2 %');
});
test('Test at toFormattedProsent skriver default verdi 2% når det gis 2 som feltverdi', () => {
    expect(toFormattedProsent(2, 2, 30)).toEqual('2 %');
});

test('Test at toFormattedProsent skriver default verdi 2% når det gis 1 som feltverdi', () => {
    expect(toFormattedProsent(1, 2, 30)).toEqual('2 %');
});

test('Test at toFormattedProsent skriver default verdi 2% når det ingen feltverdi', () => {
    expect(toFormattedProsent(undefined, 2, 30)).toEqual('2 %');
});

test('Test at <OtpprosentIput> rendres', () => {
    const wrapper = shallow(<OtpProsentInput />);
    expect(wrapper).toHaveLength(1);
});
