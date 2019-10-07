
import React from 'react';
import { shallow } from 'enzyme';
import AvtalepartnerHeaderIkon from './AvtalepartnerHeaderIkon';

test('Test that <AvtalepartnerHeaderIkon> renders correctly', () => {
    const wrapper = shallow(<AvtalepartnerHeaderIkon/>);
    expect(wrapper).toHaveLength(1);
});