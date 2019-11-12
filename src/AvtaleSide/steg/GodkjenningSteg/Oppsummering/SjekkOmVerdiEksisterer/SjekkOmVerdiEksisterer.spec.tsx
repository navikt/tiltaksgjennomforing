import React from 'react';
import { shallow } from 'enzyme';
import SjekkOmVerdiEksisterer from './SjekkOmVerdiEksisterer';

test('Test that <SjekkOmVerdiEksisterer> renders correctly', () => {
    const wrapper = shallow(<SjekkOmVerdiEksisterer />);
    expect(wrapper).toHaveLength(1);
});
