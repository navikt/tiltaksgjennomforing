import React from 'react';
import { shallow } from 'enzyme';
import natur from './natur';

test('Test that <natur> renders correctly', () => {
    const wrapper = shallow(<natur />);
    expect(wrapper).toHaveLength(1);
});
