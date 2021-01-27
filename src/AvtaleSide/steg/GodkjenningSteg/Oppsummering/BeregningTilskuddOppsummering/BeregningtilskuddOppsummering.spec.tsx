import UtregningPanel from '@/AvtaleSide/steg/BeregningTilskudd/UtregningPanel';
import lonnstilskuddAvtaleMock from '@/mocking/lonnstilskudd-avtale-mock';
import { shallow } from 'enzyme';
import React from 'react';
import HvaManglerOppsummering from '../HvaManglerOppsummering';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import BeregningTilskuddOppsummering from './BeregningTilskuddOppsummering';

test('Test at <BeregningTilskuddOppsummering> rendres', () => {
    const wrapper = shallow(<BeregningTilskuddOppsummering {...lonnstilskuddAvtaleMock} />);
    expect(wrapper).toHaveLength(1);
});

test('Skal rendre Stegoppsummering og HvaManglerOppsummering', () => {
    const wrapper = shallow(<BeregningTilskuddOppsummering {...lonnstilskuddAvtaleMock} />);
    expect(wrapper.find(Stegoppsummering) && wrapper.find(HvaManglerOppsummering)).toHaveLength(1);
});

test('Skal rendre VisUtreningPanel', () => {
    const wrapper = shallow(<BeregningTilskuddOppsummering {...lonnstilskuddAvtaleMock} />);
    expect(wrapper.find(UtregningPanel)).toHaveLength(1);
});
