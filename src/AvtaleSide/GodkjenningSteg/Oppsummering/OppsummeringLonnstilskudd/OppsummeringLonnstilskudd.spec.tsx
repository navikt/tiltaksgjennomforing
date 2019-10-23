import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import avtaleMock from '@/mocking/avtale-mock';
import { shallow } from 'enzyme';
import React from 'react';
import Avtaleparter from '../Avtaleparter/Avtaleparter';
import BeregningTilskuddOppsummering from '../BeregningTilskuddOppsummering/BeregningTilskuddOppsummering';
import LonnstilskuddOppsummering from '../LonnstilskuddOppsummering/LonnstilskuddOppsummering';
import OppfolgingOppsummering from '../oppfølging/OppfolgingOppsummering';
import StillingsOppsummering from '../StillingsOppsummering/StillingsOppsummering';
import OppsummeringLonnstilskudd from './OppsummeringLonnstilskudd';

const wrapper = shallow(
    shallow(<OppsummeringLonnstilskudd avtale={avtaleMock} />).get(0)
);

test('Skal rendre Innholdsboks', () => {
    expect(wrapper.dive().find(Innholdsboks)).toHaveLength(1);
});

// Oppsummeringskomponenter
test('Skal rendre <Avtaleparter>', () => {
    expect(wrapper.dive().find(Avtaleparter)).toHaveLength(1);
});
test('Skal rendre <StillingsOppsummering>', () => {
    expect(wrapper.dive().find(StillingsOppsummering)).toHaveLength(1);
});
test('Skal rendre <LonnstilskuddOppsummering>', () => {
    expect(wrapper.dive().find(LonnstilskuddOppsummering)).toHaveLength(1);
});
test('Skal rendre <OppfolgingOppsummering>', () => {
    expect(wrapper.dive().find(OppfolgingOppsummering)).toHaveLength(1);
});
test('Skal rendre <BeregningTilskuddOppsummering>', () => {
    expect(wrapper.dive().find(BeregningTilskuddOppsummering)).toHaveLength(1);
});
