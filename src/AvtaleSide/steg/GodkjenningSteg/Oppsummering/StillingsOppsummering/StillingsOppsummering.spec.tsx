import { shallow } from 'enzyme';
import React from 'react';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import StillingsOppsummering from './StillingsOppsummering';

test('Test at <StillingsOppsummering> rendres', () => {
    const wrapper = shallow(<StillingsOppsummering />);
    expect(wrapper).toHaveLength(1);
});

test('Skal rendre stillingstype og arbeidsoppgaver', () => {
    const wrapper = shallow(<StillingsOppsummering />);
    expect(wrapper.find(Stegoppsummering) && wrapper.find(SjekkOmVerdiEksisterer)).toHaveLength(2);
});
