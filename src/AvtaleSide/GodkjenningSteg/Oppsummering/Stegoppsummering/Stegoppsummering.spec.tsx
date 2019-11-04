import React from 'react';
import { shallow } from 'enzyme';
import Stegoppsummering from './Stegoppsummering';

test('Test that <Stegoppsummering> renders correctly', () => {
    const wrapper = shallow(<Stegoppsummering />);
    expect(wrapper).toHaveLength(1);
});
