import React from 'react';
import { shallow } from 'enzyme';
import VarighetOppsummering from './VarighetOppsummering';

test('Test that <VarighetOppsummering> renders correctly', () => {
    const wrapper = shallow(<VarighetOppsummering />);
    expect(wrapper).toHaveLength(1);
});
