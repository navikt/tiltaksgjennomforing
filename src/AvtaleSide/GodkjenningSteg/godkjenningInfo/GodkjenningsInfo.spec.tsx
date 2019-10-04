
import React from 'react';
import { shallow } from 'enzyme';
import GodkjenningsInfo from './GodkjenningsInfo';

test('Test that <GodkjenningsInfo> renders correctly', () => {
    const wrapper = shallow(<GodkjenningsInfo/>);
    expect(wrapper).toHaveLength(1);
});