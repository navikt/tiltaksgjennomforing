import React from 'react';
import { shallow } from 'enzyme';
import AvtaleSide from './AvtaleSide';

test('Test that <AvtaleSide> renders correctly', () => {
    const wrapper = shallow(<AvtaleSide />);
    expect(wrapper).toHaveLength(1);
});
