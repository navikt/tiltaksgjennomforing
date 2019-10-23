import { shallow } from 'enzyme';
import React from 'react';
import AvtaleSide from './AvtaleSide';

test('Test at <AvtaleSide> rendres', () => {
    const wrapper = shallow(<AvtaleSide />);
    expect(wrapper).toHaveLength(1);
});
