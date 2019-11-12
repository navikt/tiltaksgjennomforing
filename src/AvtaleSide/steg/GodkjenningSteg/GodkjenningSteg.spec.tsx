import React from 'react';
import { shallow } from 'enzyme';
import GodkjenningSteg from './GodkjenningSteg';

test('Test that <GodkjenningSteg> renders correctly', () => {
    const wrapper = shallow(<GodkjenningSteg />);
    expect(wrapper).toHaveLength(1);
});
