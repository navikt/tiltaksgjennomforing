
import React from 'react';
import { shallow } from 'enzyme';
import Godkjenning from './Godkjenning';

test('Test that <Godkjenning> renders correctly', () => {
    const wrapper = shallow(<Godkjenning/>);
    expect(wrapper).toHaveLength(1);
});