import { shallow } from 'enzyme';
import React from 'react';
import BeregningTilskuddOppsummering from '../BeregningTilskuddOppsummering/BeregningTilskuddOppsummering';
import LonnstilskuddOppsummering from '../LonnstilskuddOppsummering/LonnstilskuddOppsummering';
import OppfolgingOppsummering from '../oppfølging/OppfolgingOppsummering';
import StillingsOppsummering from '../StillingsOppsummering/StillingsOppsummering';
import OppsummeringLonnstilskudd from './OppsummeringLonnstilskudd';
import lonnstilskuddAvtaleMock from '@/mocking/lonnstilskudd-avtale-mock';

const wrapper = shallow(<OppsummeringLonnstilskudd avtaleinnhold={lonnstilskuddAvtaleMock} />);

test('Skal rendre <StillingsOppsummering>', () => {
    expect(wrapper.find(StillingsOppsummering)).toHaveLength(1);
});
test('Skal rendre <LonnstilskuddOppsummering>', () => {
    expect(wrapper.find(LonnstilskuddOppsummering)).toHaveLength(1);
});
test('Skal rendre <OppfolgingOppsummering>', () => {
    expect(wrapper.find(OppfolgingOppsummering)).toHaveLength(1);
});
test('Skal rendre <BeregningTilskuddOppsummering>', () => {
    expect(wrapper.find(BeregningTilskuddOppsummering)).toHaveLength(1);
});
