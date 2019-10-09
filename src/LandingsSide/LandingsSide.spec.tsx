import React from 'react';
import { shallow } from 'enzyme';
import LandingsSide from './LandingsSide';

test('Test that <LandingsSide> renders correctly', () => {
    const wrapper = shallow(<LandingsSide />);
    expect(wrapper).toHaveLength(1);
});
