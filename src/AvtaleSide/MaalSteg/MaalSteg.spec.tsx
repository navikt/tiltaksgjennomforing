
import React from 'react';
import { shallow } from 'enzyme';
import MaalSteg from './MaalSteg';

test('Test that <MaalSteg> renders correctly', () => {
    const wrapper = shallow(<MaalSteg/>);
    expect(wrapper).toHaveLength(1);
});