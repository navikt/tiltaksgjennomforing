import lonnstilskuddAvtaleMock from '@/mocking/lonnstilskudd-avtale-mock';
import { shallow } from 'enzyme';
import React from 'react';
import BeregningTilskuddOppsummering from '../BeregningTilskuddOppsummering/BeregningTilskuddOppsummering';
import OppfolgingOppsummering from '../oppfølging/OppfolgingOppsummering';
import StillingsOppsummeringLonnstilskudd from '../StillingsOppsummeringLonnstilskudd/StillingsOppsummeringLonnstilskudd';
import Tilrettelegging from '../tilrettelegging/Tilrettelegging';
import VarighetOppsummering from '../varighet/VarighetOppsummering';
import OppsummeringLonnstilskudd from './OppsummeringLonnstilskudd';

const wrapper = shallow(<OppsummeringLonnstilskudd avtaleinnhold={lonnstilskuddAvtaleMock.gjeldendeInnhold} />);

test('Skal rendre <StillingsOppsummering>', () => {
    expect(wrapper.find(StillingsOppsummeringLonnstilskudd)).toHaveLength(1);
});
test('Skal rendre <VarighetOppsummering>', () => {
    expect(wrapper.find(VarighetOppsummering)).toHaveLength(1);
});
test('Skal rendre <OppfolgingOppsummering>', () => {
    expect(wrapper.find(OppfolgingOppsummering)).toHaveLength(1);
});
test('Skal rendre <Tilrettelegging>', () => {
    expect(wrapper.find(Tilrettelegging)).toHaveLength(1);
});
test('Skal rendre <BeregningTilskuddOppsummering>', () => {
    expect(wrapper.find(BeregningTilskuddOppsummering)).toHaveLength(1);
});
