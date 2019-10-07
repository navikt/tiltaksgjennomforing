
import React from 'react';
import { shallow } from 'enzyme';
import ArbeidsgiverInstruks from './ArbeidsgiverInstruks';

test('Test that <ArbeidsgiverInstruks> renders correctly', () => {
    const wrapper = shallow(<ArbeidsgiverInstruks/>);
    expect(wrapper).toHaveLength(1);
});