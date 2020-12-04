import React from 'react';
import { shallow } from 'enzyme';
import OtpProsentInput, { tilGrense, tilVerdiMedProsentTegn } from './OtpProsentInput';

test('Test at tilVerdiMedProsentTegn skriver default verdi 3.5% når det gis 3.5 som feltverdi', () => {
    expect(tilVerdiMedProsentTegn(tilGrense(parseFloat('3.5'), 2, 30))).toEqual('3.5 %');
});
test('Test at tilVerdiMedProsentTegn skriver default verdi 30% når det gis 3+ som feltverdi', () => {
    expect(tilVerdiMedProsentTegn(tilGrense(30, 2, 30))).toEqual('30 %');
});
test('Test at tilVerdiMedProsentTegn skriver default verdi 2% når det gis 35 som feltverdi', () => {
    expect(tilVerdiMedProsentTegn(tilGrense(35, 2, 30))).toEqual('2 %');
});
test('Test at tilVerdiMedProsentTegn skriver default verdi 0% når det gis 35 som feltverdi', () => {
    expect(tilVerdiMedProsentTegn(tilGrense(35, 0, 30))).toEqual('0 %');
});
test('Test at tilVerdiMedProsentTegn skriver default verdi 2% når det gis 2 som feltverdi', () => {
    expect(tilVerdiMedProsentTegn(tilGrense(2, 2, 30))).toEqual('2 %');
});

test('Test at tilVerdiMedProsentTegn skriver default verdi 2% når det gis 1 som feltverdi', () => {
    expect(tilVerdiMedProsentTegn(tilGrense(1, 2, 30))).toEqual('2 %');
});

test('Test at tilVerdiMedProsentTegn skriver default verdi 2% når det ingen feltverdi', () => {
    expect(tilVerdiMedProsentTegn(tilGrense(undefined, 0, 30))).toEqual('0 %');
});

test('Test at <OtpprosentIput> rendres', () => {
    const wrapper = shallow(<OtpProsentInput label={'OTP Prosent'} />);
    expect(wrapper).toHaveLength(1);
});
