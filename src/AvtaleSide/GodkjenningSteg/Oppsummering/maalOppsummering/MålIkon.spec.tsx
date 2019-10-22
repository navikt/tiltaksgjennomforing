import React from 'react';
import { shallow } from 'enzyme';
import MaalIkon from './MaalIkon';

test('Test that <MålIkon> renders correctly', () => {
    const wrapper = shallow(<MaalIkon />);
    expect(wrapper).toHaveLength(1);
});
