import React from 'react';
import { shallow } from 'enzyme';
import GodkjenningRad from './GodkjenningRad';

test('Test that <GodkjenningRad> renders correctly', () => {
    const wrapper = shallow(<GodkjenningRad navn="foo" />);
    expect(wrapper).toHaveLength(1);
});
