import { shallow } from 'enzyme';
import React from 'react';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import LonnstilskuddOppsummering from './LonnstilskuddOppsummering';

test('Skal rendre Stegoppsummering og SjekkOmVerdiEksisterer', () => {
    const wrapper = shallow(<LonnstilskuddOppsummering />);
    expect(
        wrapper.find(Stegoppsummering) && wrapper.find(SjekkOmVerdiEksisterer)
    ).toHaveLength(1);
});
