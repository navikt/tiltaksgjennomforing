import { shallow } from 'enzyme';
import React from 'react';
import OppfolgingOppsummering from '../oppfølging/OppfolgingOppsummering';
import OppsummeringArbeidstrening from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringArbeidstrening/OppsummeringArbeidstrening';
import arbeidstreningAvtaleMock from '@/mocking/arbeidstrening-avtale-mock';
import MaalOppsummering from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/maalOppsummering/MaalOppsummering';
import VarighetOppsummering from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/varighet/VarighetOppsummering';
import OppgaverOppsummering from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/oppgaveOppsummering/OppgaverOppsummering';
import Tilrettelegging from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/tilrettelegging/Tilrettelegging';

const wrapper = shallow(<OppsummeringArbeidstrening avtaleinnhold={arbeidstreningAvtaleMock} />);

test('Skal rendre <MaalOppsummering>', () => {
    expect(wrapper.find(MaalOppsummering)).toHaveLength(1);
});
test('Skal rendre <OppgaverOppsummering>', () => {
    expect(wrapper.find(OppgaverOppsummering)).toHaveLength(1);
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
