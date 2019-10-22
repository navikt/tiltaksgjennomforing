import React from 'react';
import { shallow } from 'enzyme';
import MaalKort from './MaalKort';

test('Test that <MaalKort> renders correctly', () => {
    const wrapper = shallow(<MaalKort />);
    expect(wrapper).toHaveLength(1);
});
