
import React from 'react';
import { shallow } from 'enzyme';
import index from './index';

test('Test that <index> renders correctly', () => {
    const wrapper = shallow(<index/>);
    expect(wrapper).toHaveLength(1);
});