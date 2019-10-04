
import React from 'react';
import { shallow } from 'enzyme';
import UfyllerBanner from './UfyllerBanner';

test('Test that <UfyllerBanner> renders correctly', () => {
    const wrapper = shallow(<UfyllerBanner/>);
    expect(wrapper).toHaveLength(1);
});