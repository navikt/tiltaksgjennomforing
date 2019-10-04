
import React from 'react';
import { shallow } from 'enzyme';
import VarighetIkon from './VarighetIkon';

test('Test that <VarighetIkon> renders correctly', () => {
    const wrapper = shallow(<VarighetIkon/>);
    expect(wrapper).toHaveLength(1);
});