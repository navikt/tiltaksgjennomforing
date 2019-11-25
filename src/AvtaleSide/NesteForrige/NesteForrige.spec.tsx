import React from 'react';
import { shallow } from 'enzyme';
import NesteForrige from './NesteForrige';

test('Test that <NesteForrige> renders correctly', () => {
    const wrapper = shallow(<NesteForrige />);
    expect(wrapper).toHaveLength(1);
});
