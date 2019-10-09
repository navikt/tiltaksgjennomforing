import React from 'react';
import { shallow } from 'enzyme';
import PakrevdTextarea from './PakrevdTextarea';

test('Test that <PakrevdTextarea> renders correctly', () => {
    const wrapper = shallow(<PakrevdTextarea label="dummy" />);
    expect(wrapper).toHaveLength(1);
});
