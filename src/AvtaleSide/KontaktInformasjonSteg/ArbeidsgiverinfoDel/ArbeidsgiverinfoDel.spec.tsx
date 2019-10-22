import React from 'react';
import { shallow } from 'enzyme';
import ArbeidsgiverinfoDel from './ArbeidsgiverinfoDel';

test('Test that <ArbeidsgiverinfoDel> renders correctly', () => {
    const wrapper = shallow(<ArbeidsgiverinfoDel />);
    expect(wrapper).toHaveLength(1);
});
