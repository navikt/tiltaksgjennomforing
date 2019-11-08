import { shallow } from 'enzyme';
import React from 'react';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import BeregningTilskuddOppsummering from './BeregningTilskuddOppsummering';

test('Test at <BeregningTilskuddOppsummering> rendres', () => {
    const wrapper = shallow(<BeregningTilskuddOppsummering />);
    expect(wrapper).toHaveLength(1);
});

test('Skal rendre Stegoppsummering og SjekkOmVerdiEksisterer', () => {
    const wrapper = shallow(<BeregningTilskuddOppsummering />);
    expect(wrapper.find(Stegoppsummering) && wrapper.find(SjekkOmVerdiEksisterer)).toHaveLength(1);
});
