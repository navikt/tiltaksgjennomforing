
import React from 'react';
import { shallow } from 'enzyme';
import Keyboard from './Keyboard';

test('Test that <Keyboard> renders correctly', () => {
    const wrapper = shallow(<Keyboard/>);
    expect(wrapper).toHaveLength(1);
});