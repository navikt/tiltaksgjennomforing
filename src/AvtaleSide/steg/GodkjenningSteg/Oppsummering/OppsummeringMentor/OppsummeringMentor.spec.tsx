import { shallow } from 'enzyme';
import React from 'react';
import OppfolgingOppsummering from '../oppfølging/OppfolgingOppsummering';
import VarighetOppsummering from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/varighet/VarighetOppsummering';
import Tilrettelegging from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/tilrettelegging/Tilrettelegging';
import OppsummeringMentor from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringMentor/OppsummeringMentor';
import mentorAvtaleMock from '@/mocking/mentor-avtale-mock';
import OmMentorOppsummering from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringMentor/OmMentorOppsummering';

const wrapper = shallow(<OppsummeringMentor avtaleinnhold={mentorAvtaleMock} />);

test('Skal rendre <OmMentorOppsummering>', () => {
    expect(wrapper.find(OmMentorOppsummering)).toHaveLength(1);
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
